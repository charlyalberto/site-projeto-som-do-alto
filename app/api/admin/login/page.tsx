"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  // ===================================================
  // CONSULTAR STATUS DE BLOQUEIO
  // ===================================================
  //
  // Usado tanto antes de tentar o login (evita gastar
  // uma tentativa à toa) quanto depois de uma falha
  // (para mostrar quantas tentativas restam ou por
  // quanto tempo o IP ficará bloqueado).
  //

  async function consultarStatusLogin() {
    try {
      const resposta = await fetch("/api/admin/login-status", {
        method: "GET",
        cache: "no-store",
      });

      const resultado = await resposta.json();

      return {
        bloqueado: Boolean(resultado.bloqueado),
        tentativasRestantes: Number(resultado.tentativasRestantes ?? 5),
        minutosRestantes: Number(resultado.minutosRestantes ?? 0),
      };
    } catch (error) {
      console.error("Erro ao consultar status de login:", error);

      return {
        bloqueado: false,
        tentativasRestantes: 5,
        minutosRestantes: 0,
      };
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    // =================================================
    // VERIFICAR BLOQUEIO ANTES DE TENTAR
    // =================================================

    const statusAntes = await consultarStatusLogin();

    if (statusAntes.bloqueado) {
      setBloqueado(true);
      setErro(
        `Muitas tentativas de login incorretas. Tente novamente em ${statusAntes.minutosRestantes} minuto(s).`
      );
      setCarregando(false);
      return;
    }

    const resultado = await signIn("credentials", {
      username: usuario,
      password: senha,
      redirect: false,
    });

    if (resultado?.error) {
      // ===============================================
      // CONSULTAR STATUS ATUALIZADO APÓS A FALHA
      // ===============================================

      const statusDepois = await consultarStatusLogin();

      if (statusDepois.bloqueado) {
        setBloqueado(true);
        setErro(
          `Muitas tentativas de login incorretas. Tente novamente em ${statusDepois.minutosRestantes} minuto(s).`
        );
      } else {
        setBloqueado(false);
        setErro(
          statusDepois.tentativasRestantes <= 2
            ? `Usuário ou senha inválidos. Restam ${statusDepois.tentativasRestantes} tentativa(s) antes do bloqueio temporário.`
            : "Usuário ou senha inválidos."
        );
      }

      setCarregando(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

          <div className="bg-orange-500 px-8 py-8 text-center">
            <img
              src="/images/logo.png"
              alt="Projeto Som do Alto"
              className="w-[190px] h-auto mx-auto"
            />

            <h1 className="text-2xl font-bold text-white mt-6">
              Área Administrativa
            </h1>

            <p className="text-orange-50 text-sm mt-2">
              Acesso restrito aos administradores
            </p>
          </div>

          <div className="p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="usuario"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Usuário
                </label>

                <input
                  id="usuario"
                  type="text"
                  value={usuario}
                  onChange={(event) => setUsuario(event.target.value)}
                  autoComplete="username"
                  required
                  disabled={bloqueado}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  placeholder="Digite seu usuário"
                />
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Senha
                </label>

                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={bloqueado}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  placeholder="Digite sua senha"
                />
              </div>

              {erro && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-700 font-medium">
                    {erro}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={carregando || bloqueado}
                className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 transition disabled:cursor-not-allowed"
              >
                {carregando
                  ? "Entrando..."
                  : bloqueado
                    ? "Login bloqueado temporariamente"
                    : "Entrar"}
              </button>

            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <a
                href="/"
                className="text-sm font-medium text-gray-500 hover:text-orange-600 transition"
              >
                ← Voltar ao site
              </a>
            </div>

          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Projeto Som do Alto · Área Administrativa
        </p>

      </div>
    </main>
  );
}
