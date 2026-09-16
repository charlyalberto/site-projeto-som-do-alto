import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "otplib";

const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec";


// =====================================================
// OBTER IP DA REQUISIÇÃO
// =====================================================
//
// Em produção (Vercel ou similar), o IP real do
// visitante vem no cabeçalho "x-forwarded-for". Em
// desenvolvimento local, normalmente não existe esse
// cabeçalho, então cai no fallback "localhost".
//

function obterIpRequisicao(
  request: Request | undefined
): string {

  if (!request) {

    return "desconhecido";

  }


  const encaminhado =
    request.headers.get(
      "x-forwarded-for"
    );


  if (encaminhado) {

    return encaminhado
      .split(",")[0]
      .trim();

  }


  const ipReal =
    request.headers.get(
      "x-real-ip"
    );


  if (ipReal) {

    return ipReal.trim();

  }


  return "localhost";

}


// =====================================================
// VERIFICAR BLOQUEIO DE LOGIN NO GOOGLE APPS SCRIPT
// =====================================================

async function verificarBloqueioLogin(
  ip: string
): Promise<{
  bloqueado: boolean;
  tentativasRestantes: number;
  minutosRestantes: number;
}> {

  try {

    const resposta =
      await fetch(
        `${URL_GOOGLE_APPS_SCRIPT}?acao=verificarBloqueioLogin&ip=${encodeURIComponent(
          ip
        )}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );


    const resultado =
      await resposta.json();


    return {

      bloqueado:
        Boolean(
          resultado.bloqueado
        ),

      tentativasRestantes:
        Number(
          resultado.tentativasRestantes ??
          5
        ),

      minutosRestantes:
        Number(
          resultado.minutosRestantes ??
          0
        ),

    };


  } catch (erro) {

    console.error(
      "Erro ao verificar bloqueio de login:",
      erro
    );


    // =================================================
    // FALHAR ABERTO
    // =================================================
    //
    // Se o controle de rate limiting não responder,
    // preferimos permitir a tentativa de login a
    // deixar o admin travado por um erro externo.
    //

    return {

      bloqueado: false,

      tentativasRestantes: 5,

      minutosRestantes: 0,

    };

  }

}


// =====================================================
// REGISTRAR TENTATIVA DE LOGIN FALHA
// =====================================================

async function registrarTentativaLoginFalha(
  ip: string
): Promise<void> {

  try {

    await fetch(

      URL_GOOGLE_APPS_SCRIPT,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "text/plain;charset=utf-8",

        },

        body:
          JSON.stringify({

            acao:
              "registrarTentativaLoginFalha",

            ip:
              ip,

          }),

      }

    );

  } catch (erro) {

    console.error(
      "Erro ao registrar tentativa de login falha:",
      erro
    );

  }

}


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credenciais",

      credentials: {
        username: {
          label: "Usuário",
          type: "text",
        },

        password: {
          label: "Senha",
          type: "password",
        },

        token: {
          label: "Código de verificação",
          type: "text",
        },
      },

      async authorize(credentials, request) {

        const ip =
          obterIpRequisicao(
            request
          );


        // =================================================
        // VERIFICAR SE O IP ESTÁ BLOQUEADO
        // =================================================
        //
        // Isso acontece ANTES de comparar usuário e
        // senha — é o controle real de segurança, não
        // apenas uma mensagem na tela.
        //

        const statusBloqueio =
          await verificarBloqueioLogin(
            ip
          );


        if (
          statusBloqueio.bloqueado
        ) {

          console.warn(
            "Login bloqueado por rate limiting:",
            ip
          );

          return null;

        }


        // =================================================
        // VALIDAR USUÁRIO E SENHA
        // =================================================

        const username = process.env.ADMIN_USER;
        const password = process.env.ADMIN_PASSWORD;

        const credenciaisCorretas =
          credentials?.username === username &&
          credentials?.password === password;


        // =================================================
        // VALIDAR CÓDIGO TOTP (SEGUNDO FATOR)
        // =================================================
        //
        // Só verifica o código se usuário e senha já
        // estiverem certos — evita gastar processamento
        // e, mais importante, não revela por meio de
        // timing se o problema foi a senha ou o código.
        //

        let codigoValido = false;

          if (credenciaisCorretas) {
            try {
              const resultadoTotp = await verify({
                secret: process.env.ADMIN_TOTP_SECRET || "",
                token: String(credentials?.token || "").trim(),
              });

              codigoValido = resultadoTotp.valid;

            } catch (erroTotp) {

              console.error(
                "Erro ao verificar código TOTP:",
                erroTotp
              );

              codigoValido = false;
            }
          }


        // =================================================
        // SUCESSO — SENHA E CÓDIGO CORRETOS
        // =================================================

        if (
          credenciaisCorretas &&
          codigoValido
        ) {

          return {
            id: "admin",
            name: "Administrador",
          };

        }


        // =================================================
        // FALHA — REGISTRAR TENTATIVA
        // =================================================
        //
        // Não diferenciamos na resposta se foi a senha
        // ou o código que errou, para não dar pistas a
        // quem estiver tentando adivinhar.
        //

        await registrarTentativaLoginFalha(
          ip
        );


        return null;

      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;

      // Login e consulta de bloqueio são públicos.
      if (
        pathname === "/admin/login" ||
        pathname === "/api/admin/login-status"
      ) {
        return true;
      }

      // Todas as demais páginas e APIs administrativas
      // exigem autenticação.
      return !!auth?.user;
    },
  },
});