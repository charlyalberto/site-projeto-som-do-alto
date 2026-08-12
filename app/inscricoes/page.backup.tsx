"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type FormData = {
  nomeAluno: string;
  whatsapp: string;
  cpfAluno: string;
  dataNascimento: string;
  cidade: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;

  certidaoNascimento: File | null;
  fotoAluno: File | null;

  nomeResponsavel: string;
  parentesco: string;
  cpfResponsavel: string;

  estuda: string;
  escola: string;
  redeEnsino: string;
  serie: string;
  periodoEstudo: string;

  tocaInstrumento: string;
  qualInstrumento: string;
  instrumentoInteresse: string;

  moradia: string;
  quemMoraComAluno: string[];
  pessoasResidencia: string;
  situacaoConjugalPais: string;
  paisFalecidos: string;
  qualPaiMaeFalecido: string;
  pessoasRendaFamiliar: string;
  rendaFamiliar: string;
  outraRenda: string;

  possuiNecessidade: string;
  necessidadesEspecificas: string[];
  outraNecessidade: string;
  informacaoAcolhimento: string;
  adaptacoes: string[];
  outraAdaptacao: string;

  televisao: string;
  geladeira: string;
  maquinaLavar: string;
  microondas: string;
  computadorNotebook: string;
  celular: string;
  internet: string;
  carro: string;
  moto: string;

  comoConheceu: string;
  numeroCalcado: string;
  tamanhoCamisa: string;
  tamanhoCalcaSaia: string;

  autorizaImagem: string;
  justificativaNaoAutoriza: string;
  declaracaoVeracidade: boolean;
};

const dadosIniciais: FormData = {
  nomeAluno: "",
  whatsapp: "",
  cpfAluno: "",
  dataNascimento: "",
  cidade: "",
  cep: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  uf: "",

  certidaoNascimento: null,
  fotoAluno: null,

  nomeResponsavel: "",
  parentesco: "",
  cpfResponsavel: "",

  estuda: "",
  escola: "",
  redeEnsino: "",
  serie: "",
  periodoEstudo: "",

  tocaInstrumento: "",
  qualInstrumento: "",
  instrumentoInteresse: "",

  moradia: "",
  quemMoraComAluno: [],
  pessoasResidencia: "",
  situacaoConjugalPais: "",
  paisFalecidos: "",
  qualPaiMaeFalecido: "",
  pessoasRendaFamiliar: "",
  rendaFamiliar: "",
  outraRenda: "",

  possuiNecessidade: "",
  necessidadesEspecificas: [],
  outraNecessidade: "",
  informacaoAcolhimento: "",
  adaptacoes: [],
  outraAdaptacao: "",

  televisao: "0",
  geladeira: "0",
  maquinaLavar: "0",
  microondas: "0",
  computadorNotebook: "0",
  celular: "0",
  internet: "",
  carro: "0",
  moto: "0",

  comoConheceu: "",
  numeroCalcado: "",
  tamanhoCamisa: "",
  tamanhoCalcaSaia: "",

  autorizaImagem: "",
  justificativaNaoAutoriza: "",
  declaracaoVeracidade: false,
};

export default function Inscricoes() {
  const [etapa, setEtapa] = useState(1);
  const [idade, setIdade] = useState<number | null>(null);
  const [dados, setDados] = useState<FormData>(dadosIniciais);

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [inscricaoEnviada, setInscricaoEnviada] = useState(false);
  const [numeroInscricao, setNumeroInscricao] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const alunoMenor = idade !== null && idade < 18;

  /*
   * ETAPAS
   *
   * 1 - Dados do aluno
   * 2 - Documentos
   * 3 - Responsável, somente menor
   * 4 - Escola
   * 5 - Formação musical
   * 6 - Perfil sociofamiliar
   * 7 - Necessidades específicas
   * 8 - Residência
   * 9 - Informações finais
   * 10 - Autorização
   */

  const etapas = [
    1,
    2,
    ...(alunoMenor ? [3] : []),
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ];

  const indiceAtual = etapas.indexOf(etapa);
  const totalEtapas = etapas.length;

  const atualizar = <K extends keyof FormData>(
    campo: K,
    valor: FormData[K]
  ) => {
    setDados((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const calcularIdade = (data: string) => {
    atualizar("dataNascimento", data);

    if (!data) {
      setIdade(null);
      return;
    }

    const nascimento = new Date(`${data}T00:00:00`);
    const hoje = new Date();

    let idadeCalculada =
      hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
      idadeCalculada--;
    }

    setIdade(idadeCalculada);

    if (idadeCalculada >= 18 && etapa === 3) {
      setEtapa(4);
    }
  };

  const buscarCep = async (valor: string) => {
    const cepLimpo = valor.replace(/\D/g, "");

    atualizar("cep", valor);
    setErroCep("");

    if (cepLimpo.length !== 8) {
      atualizar("endereco", "");
      atualizar("bairro", "");
      atualizar("cidade", "");
      atualizar("uf", "");
      return;
    }

    try {
      setBuscandoCep(true);

      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      if (!resposta.ok) {
        throw new Error("Erro na consulta");
      }

      const resultado = await resposta.json();

      if (resultado.erro) {
        setErroCep("CEP não encontrado.");
        atualizar("endereco", "");
        atualizar("bairro", "");
        atualizar("cidade", "");
        atualizar("uf", "");
        return;
      }

      atualizar("endereco", resultado.logradouro || "");
      atualizar("bairro", resultado.bairro || "");
      atualizar("cidade", resultado.localidade || "");
      atualizar("uf", resultado.uf || "");
    } catch {
      setErroCep(
        "Não foi possível consultar o CEP. Você poderá preencher o endereço manualmente."
      );
    } finally {
      setBuscandoCep(false);
    }
  };

  const proximaEtapa = () => {
    const proxima = etapas[indiceAtual + 1];

    if (proxima) {
      setEtapa(proxima);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const etapaAnterior = () => {
    const anterior = etapas[indiceAtual - 1];

    if (anterior) {
      setEtapa(anterior);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const toggleLista = (
    campo: "quemMoraComAluno" | "necessidadesEspecificas" | "adaptacoes",
    valor: string
  ) => {
    const lista = dados[campo];

    if (lista.includes(valor)) {
      atualizar(
        campo,
        lista.filter((item) => item !== valor)
      );
    } else {
      atualizar(campo, [...lista, valor]);
    }
  };

  const selecionarMorador = (valor: string) => {
  // =====================================================
  // MORO SOZINHO(A)
  // =====================================================

  if (valor === "Moro sozinho(a)") {
    const jaSelecionado =
      dados.quemMoraComAluno.includes("Moro sozinho(a)");

    // Se já estiver marcado, permite desmarcar
    if (jaSelecionado) {
      atualizar("quemMoraComAluno", []);
      atualizar("pessoasResidencia", "");
      return;
    }

    // Se não estiver marcado, seleciona somente ele
    atualizar("quemMoraComAluno", ["Moro sozinho(a)"]);
    atualizar("pessoasResidencia", "1");

    return;
  }


  // =====================================================
  // OUTRAS OPÇÕES
  // =====================================================

  const atual = dados.quemMoraComAluno.filter(
    (item) => item !== "Moro sozinho(a)"
  );

  if (atual.includes(valor)) {

    atualizar(
      "quemMoraComAluno",
      atual.filter((item) => item !== valor)
    );

  } else {

    atualizar(
      "quemMoraComAluno",
      [...atual, valor]
    );

  }
};


  const arquivoParaBase64 = (
    arquivo: File
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const resultado = reader.result as string;
        const partes = resultado.split(",");

        if (partes.length < 2) {
          reject(
            new Error(
              `Não foi possível processar o arquivo: ${arquivo.name}`
            )
          );
          return;
        }

        resolve(partes[1]);
      };

      reader.onerror = () => {
        reject(
          new Error(
            `Não foi possível ler o arquivo: ${arquivo.name}`
          )
        );
      };

      reader.readAsDataURL(arquivo);
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (indiceAtual < totalEtapas - 1) {
      proximaEtapa();
      return;
    }

    if (enviando) {
      return;
    }

    if (!dados.certidaoNascimento) {
      alert(
        "Por favor, envie a certidão de nascimento do aluno."
      );
      return;
    }

    if (!dados.fotoAluno) {
      alert(
        "Por favor, envie a foto do aluno."
      );
      return;
    }

    const limiteArquivo = 5 * 1024 * 1024;

    if (dados.certidaoNascimento.size > limiteArquivo) {
      alert(
        "A certidão de nascimento deve ter no máximo 5 MB."
      );
      return;
    }

    if (dados.fotoAluno.size > limiteArquivo) {
      alert(
        "A foto do aluno deve ter no máximo 5 MB."
      );
      return;
    }

    try {
      setEnviando(true);

      const certidaoBase64 =
        await arquivoParaBase64(
          dados.certidaoNascimento
        );

      const fotoBase64 =
        await arquivoParaBase64(
          dados.fotoAluno
        );

      const dadosParaEnvio = {
        ...dados,

        certidaoNascimento: {
          name: dados.certidaoNascimento.name,
          type: dados.certidaoNascimento.type,
          size: dados.certidaoNascimento.size,
          data: certidaoBase64,
        },

        fotoAluno: {
          name: dados.fotoAluno.name,
          type: dados.fotoAluno.type,
          size: dados.fotoAluno.size,
          data: fotoBase64,
        },
      };

      console.log(
        "Enviando inscrição com documentos:",
        {
          ...dadosParaEnvio,
          certidaoNascimento: {
            name: dadosParaEnvio.certidaoNascimento.name,
            type: dadosParaEnvio.certidaoNascimento.type,
            size: dadosParaEnvio.certidaoNascimento.size,
          },
          fotoAluno: {
            name: dadosParaEnvio.fotoAluno.name,
            type: dadosParaEnvio.fotoAluno.type,
            size: dadosParaEnvio.fotoAluno.size,
          },
        }
      );

      const resposta = await fetch(
        "https://script.google.com/macros/s/AKfycbyzQvmlyQfvh_Y1JFHG697N5vbj59w-EuPfR1WmBuUGxBZ1swciS6VeMLLXdljV8KdFdQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },
          body: JSON.stringify(
            dadosParaEnvio
          ),
        }
      );

      const resultado =
        await resposta.json();

      console.log(
        "Resposta do Google Apps Script:",
        resultado
      );

      if (!resultado.sucesso) {
        throw new Error(
          resultado.mensagem ||
            "Não foi possível enviar a inscrição."
        );
      }

      setNumeroInscricao(resultado.id || "");
      setInscricaoEnviada(true);

      // Limpa todos os dados do formulário.
      setDados(dadosIniciais);
      setIdade(null);
      setErroCep("");
      setBuscandoCep(false);

      // Limpa também os campos nativos de arquivo.
      formRef.current?.reset();

      // Retorna para a primeira etapa.
      setEtapa(1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (erro) {
      console.error(
        "Erro ao enviar inscrição:",
        erro
      );

      alert(
        erro instanceof Error
          ? erro.message
          : "Não foi possível enviar a inscrição.\n\nVerifique sua conexão e os arquivos enviados e tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  };


  return (
    <main className="min-h-screen bg-gray-50">

      {/* =====================================================
          ABERTURA / HERO
      ====================================================== */}

      <section className="relative min-h-[620px] md:min-h-[680px] overflow-hidden bg-black text-white">

        <Image
          src="/images/inscricoes/sda-orquestra.jpg"
          alt="Orquestra Som do Alto em apresentação"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85" />

        <div className="relative z-10 min-h-[620px] md:min-h-[680px] flex items-center justify-center px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">

            <span className="inline-flex items-center bg-orange-500/90 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6 shadow-lg">
              FAÇA PARTE DO PROJETO SOM DO ALTO
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 drop-shadow-lg">
              Inscrições 2026
            </h1>

            <p className="text-2xl md:text-3xl font-semibold leading-tight max-w-3xl mx-auto drop-shadow-md">
              Sua história pode começar com uma música.
            </p>

            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mt-5">
              Aprenda música, desenvolva seu talento, faça novas amizades e
              descubra novas possibilidades através da arte.
            </p>

            <p className="mt-5 text-sm md:text-base font-semibold text-white/90">
              Formação musical gratuita para crianças e adolescentes de 8 a 18 anos.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("formulario-inscricao")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-8 py-4 text-base md:text-lg font-extrabold shadow-xl transition-transform duration-200 hover:scale-[1.03]"
            >
              QUERO ME INSCREVER
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          GALERIA
      ====================================================== */}

      <section className="bg-white py-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 md:gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none">
            {[
              ["/images/inscricoes/flautas.jpg", "Alunos durante a formação musical"],
              ["/images/inscricoes/violinos.jpg", "Alunos da seção de violinos"],
              ["/images/inscricoes/violoncelo.jpg", "Aluno da seção de violoncelo"],
              ["/images/inscricoes/flauta-doce.jpg", "Aluno em aula de flauta"],
              ["/images/inscricoes/metais.jpg", "Alunos da seção de metais"],
            ].map(([src, alt]) => (
              <div
                key={src}
                className="relative min-w-[72vw] sm:min-w-[42vw] md:min-w-0 md:flex-1 h-44 md:h-48 overflow-hidden rounded-2xl snap-start group shadow-sm"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 72vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MENSAGEM INSTITUCIONAL
      ====================================================== */}

      <section className="bg-orange-50 py-10 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🎵",
              title: "Música gratuita",
              text: "Aprendizado musical e desenvolvimento de talentos."
            },
            {
              icon: "🎻",
              title: "Diversos instrumentos",
              text: "Flauta, violino, viola, violoncelo, metais e muito mais."
            },
            {
              icon: "❤️",
              title: "Transformação através da música",
              text: "Um espaço de aprendizado, convivência e oportunidades."
            }
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h2 className="font-extrabold text-gray-900 text-lg">{item.title}</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto text-center text-xl md:text-2xl font-bold text-gray-800 mt-10">
          Aqui, cada instrumento conta uma história. E a próxima pode ser a sua.
        </p>
      </section>

      {/* =====================================================
          CONTEÚDO / FORMULÁRIO
      ====================================================== */}

      <section id="formulario-inscricao" className="py-12 px-6">

        <div className="max-w-5xl mx-auto">

          {/* =================================================
              PROGRESSO
          ================================================== */}

          <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

            <div className="flex justify-between items-center mb-3">

              <span className="text-sm font-semibold text-gray-700">
                Etapa {indiceAtual + 1} de {totalEtapas}
              </span>

              <span className="text-sm text-orange-600 font-semibold">
                {Math.round(
                  ((indiceAtual + 1) / totalEtapas) * 100
                )}
                %
              </span>

            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{
                  width: `${((indiceAtual + 1) / totalEtapas) * 100}%`,
                }}
              />

            </div>

          </div>


          {/* =================================================
              FORMULÁRIO
          ================================================== */}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10"
          >

            {/* =================================================
                ETAPA 1 — DADOS DO ALUNO
            ================================================== */}

            {etapa === 1 && (

              <div>

                <SectionTitle
                  icon="👤"
                  title="Dados do aluno"
                  description="Informe os dados da criança ou adolescente."
                />

                <div className="grid md:grid-cols-2 gap-6">

                  <Input
                    label="Nome completo do aluno *"
                    name="nomeAluno"
                    value={dados.nomeAluno}
                    placeholder="Digite o nome completo"
                    required
                    full
                    onChange={(e) =>
                      atualizar("nomeAluno", e.target.value)
                    }
                  />

                  <Input
                    label="WhatsApp do aluno ou responsável *"
                    name="whatsapp"
                    value={dados.whatsapp}
                    placeholder="(81) 99999-9999"
                    type="tel"
                    required
                    onChange={(e) =>
                      atualizar("whatsapp", e.target.value)
                    }
                  />

                  <Input
                    label="CPF do aluno"
                    name="cpfAluno"
                    value={dados.cpfAluno}
                    placeholder="000.000.000-00"
                    onChange={(e) =>
                      atualizar("cpfAluno", e.target.value)
                    }
                  />

                  <Input
                    label="Data de nascimento *"
                    name="dataNascimento"
                    value={dados.dataNascimento}
                    type="date"
                    required
                    onChange={(e) =>
                      calcularIdade(e.target.value)
                    }
                  />

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Idade
                    </label>

                    <div className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-600">
                      {idade !== null
                        ? `${idade} anos`
                        : "Calculada automaticamente"}
                    </div>

                  </div>

                  <div>

                    <Input
                      label="CEP *"
                      name="cep"
                      value={dados.cep}
                      placeholder="00000-000"
                      required
                      onChange={(e) =>
                        buscarCep(e.target.value)
                      }
                    />

                    {buscandoCep && (
                      <p className="text-sm text-orange-600 mt-2">
                        Consultando endereço...
                      </p>
                    )}

                    {erroCep && (
                      <p className="text-sm text-red-600 mt-2">
                        {erroCep}
                      </p>
                    )}

                  </div>

                  <Input
                    label="Logradouro *"
                    name="endereco"
                    value={dados.endereco}
                    placeholder="Preenchido automaticamente pelo CEP"
                    required
                    full
                    readOnly
                    onChange={(e) =>
                      atualizar("endereco", e.target.value)
                    }
                  />

                  <Input
                    label="Número *"
                    name="numero"
                    value={dados.numero}
                    placeholder="Número"
                    required
                    onChange={(e) =>
                      atualizar("numero", e.target.value)
                    }
                  />

                  <Input
                    label="Complemento"
                    name="complemento"
                    value={dados.complemento}
                    placeholder="Apartamento, bloco, casa..."
                    onChange={(e) =>
                      atualizar("complemento", e.target.value)
                    }
                  />

                  <Input
                    label="Bairro *"
                    name="bairro"
                    value={dados.bairro}
                    placeholder="Preenchido automaticamente"
                    required
                    readOnly
                    onChange={(e) =>
                      atualizar("bairro", e.target.value)
                    }
                  />

                  <Input
                    label="Cidade *"
                    name="cidade"
                    value={dados.cidade}
                    placeholder="Preenchido automaticamente"
                    required
                    readOnly
                    onChange={(e) =>
                      atualizar("cidade", e.target.value)
                    }
                  />

                  <Input
                    label="UF"
                    name="uf"
                    value={dados.uf}
                    placeholder="UF"
                    readOnly
                    onChange={(e) =>
                      atualizar("uf", e.target.value)
                    }
                  />

                </div>


                {idade !== null && (

                  <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">

                    {idade < 18 ? (

                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>Aluno menor de 18 anos:</strong>{" "}
                        os dados do responsável legal serão solicitados
                        na próxima etapa.
                      </p>

                    ) : (

                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>Aluno maior de idade:</strong>{" "}
                        os dados de responsável não serão solicitados.
                      </p>

                    )}

                  </div>

                )}

              </div>

            )}


            {/* =================================================
                ETAPA 2 — DOCUMENTOS
            ================================================== */}

            {etapa === 2 && (

              <div>

                <SectionTitle
                  icon="📄"
                  title="Documentos e foto"
                  description="Envie os documentos solicitados para o cadastro do aluno."
                />

                <div className="space-y-6">

                  <FileBox
                    title="Certidão de nascimento"
                    description="Envie uma imagem ou PDF da certidão de nascimento. A imagem deve estar bem enquadrada e nítida."
                    name="certidaoNascimento"
                    accept="image/*,.pdf"
                    value={dados.certidaoNascimento}
                    onChange={(file) =>
                      atualizar("certidaoNascimento", file)
                    }
                  />

                  <FileBox
                    title="Foto do aluno"
                    description="Envie uma foto atual, bem iluminada e com o rosto claramente visível."
                    name="fotoAluno"
                    accept="image/*"
                    value={dados.fotoAluno}
                    onChange={(file) =>
                      atualizar("fotoAluno", file)
                    }
                  />

                </div>

                <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">

                  <p className="text-sm text-gray-700 leading-relaxed">
                    Os documentos serão utilizados exclusivamente para
                    fins relacionados ao cadastro e acompanhamento do
                    aluno no Projeto Som do Alto.
                  </p>

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 3 — RESPONSÁVEL
            ================================================== */}

            {etapa === 3 && alunoMenor && (

              <div>

                <SectionTitle
                  icon="👨‍👩‍👧"
                  title="Dados do responsável legal"
                  description="Como o aluno possui menos de 18 anos, precisamos dos dados do responsável legal."
                />

                <div className="grid md:grid-cols-2 gap-6">

                  <Input
                    label="Nome completo do responsável *"
                    name="nomeResponsavel"
                    value={dados.nomeResponsavel}
                    placeholder="Nome completo"
                    required
                    full
                    onChange={(e) =>
                      atualizar("nomeResponsavel", e.target.value)
                    }
                  />

                  <Select
                    label="Grau de parentesco *"
                    name="parentesco"
                    value={dados.parentesco}
                    required
                    options={[
                      "Mãe",
                      "Pai",
                      "Avó / Avô",
                      "Tia / Tio",
                      "Responsável legal",
                      "Outro",
                    ]}
                    onChange={(e) =>
                      atualizar("parentesco", e.target.value)
                    }
                  />

                  <Input
                    label="CPF do responsável *"
                    name="cpfResponsavel"
                    value={dados.cpfResponsavel}
                    placeholder="000.000.000-00"
                    required
                    onChange={(e) =>
                      atualizar("cpfResponsavel", e.target.value)
                    }
                  />

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 4 — ESCOLA
            ================================================== */}

            {etapa === 4 && (

              <div>

                <SectionTitle
                  icon="🏫"
                  title="Informações escolares"
                  description="Informe a situação escolar atual do aluno."
                />

                <div className="space-y-8">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      O aluno ainda estuda? *
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">

                      <ChoiceCard
                        selected={dados.estuda === "Sim"}
                        icon="🏫"
                        title="Sim"
                        description="O aluno está estudando atualmente."
                        onClick={() => atualizar("estuda", "Sim")}
                      />

                      <ChoiceCard
                        selected={dados.estuda === "Não"}
                        icon="📚"
                        title="Não"
                        description="O aluno não está estudando atualmente."
                        onClick={() => {
                          atualizar("estuda", "Não");
                          atualizar("escola", "");
                          atualizar("redeEnsino", "");
                          atualizar("serie", "");
                          atualizar("periodoEstudo", "");
                        }}
                      />

                    </div>

                    {!dados.estuda && (
                      <input
                        type="radio"
                        name="estuda"
                        required
                        className="sr-only"
                      />
                    )}

                  </div>


                  {dados.estuda === "Sim" && (

                    <div className="space-y-6">

                      <div className="border-t border-gray-100 pt-6">

                        <p className="text-sm font-semibold text-orange-600 mb-5">
                          Informações da escola
                        </p>

                      </div>

                      <Input
                        label="Nome da escola *"
                        name="escola"
                        value={dados.escola}
                        placeholder="Nome completo da escola"
                        required
                        full
                        onChange={(e) =>
                          atualizar("escola", e.target.value)
                        }
                      />

                      <div className="grid md:grid-cols-2 gap-6">

                        <Select
                          label="Qual a rede de ensino? *"
                          name="redeEnsino"
                          value={dados.redeEnsino}
                          required
                          options={[
                            "Municipal",
                            "Estadual",
                            "Federal",
                            "Particular",
                            "Outra",
                          ]}
                          onChange={(e) =>
                            atualizar("redeEnsino", e.target.value)
                          }
                        />

                        <Input
                          label="Ano / Série *"
                          name="serie"
                          value={dados.serie}
                          placeholder="Ex.: 8º ano"
                          required
                          onChange={(e) =>
                            atualizar("serie", e.target.value)
                          }
                        />

                        <Select
                          label="Qual o período do estudo? *"
                          name="periodoEstudo"
                          value={dados.periodoEstudo}
                          required
                          options={[
                            "Manhã",
                            "Tarde",
                            "Noite",
                            "Integral",
                          ]}
                          onChange={(e) =>
                            atualizar("periodoEstudo", e.target.value)
                          }
                        />

                      </div>

                    </div>

                  )}

                  {dados.estuda === "Não" && (

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">

                      <p className="text-gray-600 text-sm leading-relaxed">
                        Tudo certo. Como o aluno informou que não está
                        estudando atualmente, não precisamos solicitar
                        os dados escolares.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 5 — MÚSICA
            ================================================== */}

            {etapa === 5 && (

              <div>

                <SectionTitle
                  icon="🎵"
                  title="Formação musical"
                  description="Conte-nos sobre a experiência musical do aluno."
                />

                <div className="space-y-8">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Você já toca algum instrumento? *
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">

                      <ChoiceCard
                        selected={dados.tocaInstrumento === "Sim"}
                        title="Sim"
                        description="Já possui experiência com algum instrumento."
                        onClick={() =>
                          atualizar("tocaInstrumento", "Sim")
                        }
                      />

                      <ChoiceCard
                        selected={dados.tocaInstrumento === "Não"}
                        title="Não"
                        description="Ainda não toca nenhum instrumento."
                        onClick={() => {
                          atualizar("tocaInstrumento", "Não");
                          atualizar("qualInstrumento", "");
                        }}
                      />

                    </div>

                  </div>


                  {dados.tocaInstrumento === "Sim" && (

                    <Input
                      label="Qual instrumento? *"
                      name="qualInstrumento"
                      value={dados.qualInstrumento}
                      placeholder="Informe o instrumento"
                      required
                      onChange={(e) =>
                        atualizar("qualInstrumento", e.target.value)
                      }
                    />

                  )}


                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Qual instrumento de interesse? *
                    </label>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

                      {[
                        ["🎤", "Canto Coral"],
                        ["🎼", "Flauta Doce"],
                        ["📖", "Teoria Musical"],
                        ["🎼", "Flauta Transversal"],
                        ["🎻", "Violino"],
                        ["🎻", "Viola"],
                        ["🎻", "Violoncelo"],
                        ["🎺", "Trompete"],
                        ["🎺", "Trombone"],
                        ["🎶", "Clarinete"],
                        ["🎺", "Bombardino"],
                      ].map(([icon, nome]) => (

                        <ChoiceCard
                          key={nome}
                          selected={
                            dados.instrumentoInteresse === nome
                          }
                          icon={icon}
                          title={nome}
                          onClick={() =>
                            atualizar(
                              "instrumentoInteresse",
                              nome
                            )
                          }
                        />

                      ))}

                    </div>

                  </div>


                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

                    <p className="text-sm text-gray-700 leading-relaxed">
                      Algumas modalidades possuem critérios específicos
                      de ingresso, conforme disponibilidade de vagas,
                      instrumento próprio e conhecimento musical prévio.
                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 6 — PERFIL SOCIOFAMILIAR
            ================================================== */}

            {etapa === 6 && (

              <div>

                <SectionTitle
                  icon="🏠"
                  title="Perfil sociofamiliar"
                  description="Queremos conhecer melhor a realidade do aluno e de sua família."
                />

                <div className="space-y-8">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Onde e como você mora atualmente? *
                    </label>

                    <div className="grid md:grid-cols-2 gap-4">

                      {[
                        "Em casa ou apartamento, com sua família",
                        "Em casa de outros familiares",
                        "Em casa de amigos",
                        "Em habitação coletiva",
                      ].map((opcao) => (

                        <ChoiceCard
                          key={opcao}
                          selected={dados.moradia === opcao}
                          title={opcao}
                          onClick={() =>
                            atualizar("moradia", opcao)
                          }
                        />

                      ))}

                    </div>

                  </div>


                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Quem mora com você? *
                    </label>

                    <div className="grid md:grid-cols-2 gap-4">

                      {[
                        "Moro sozinho(a)",
                        "Pai",
                        "Mãe",
                        "Irmãos",
                        "Outros parentes",
                        "Amigos ou colegas",
                      ].map((opcao) => (

                        <CheckCard
                          key={opcao}
                          label={opcao}
                          checked={dados.quemMoraComAluno.includes(opcao)}
                          disabled={
                            opcao !== "Moro sozinho(a)" &&
                            dados.quemMoraComAluno.includes(
                              "Moro sozinho(a)"
                            )
                          }
                          onChange={() =>
                            selecionarMorador(opcao)
                          }
                        />

                      ))}

                    </div>

                  </div>


                  <Input
                    label="Quantas pessoas moram em sua casa, incluindo você? *"
                    name="pessoasResidencia"
                    value={dados.pessoasResidencia}
                    type="number"
                    min="1"
                    placeholder="Quantidade"
                    required
                    onChange={(e) =>
                      atualizar(
                        "pessoasResidencia",
                        e.target.value
                      )
                    }
                  />


                  <Select
                    label="Qual a situação conjugal de seus pais?"
                    name="situacaoConjugalPais"
                    value={dados.situacaoConjugalPais}
                    options={[
                      "Casados",
                      "União estável",
                      "Separados",
                      "Divorciados",
                      "Viúvo(a)",
                      "Outro",
                      "Não informado",
                    ]}
                    onChange={(e) =>
                      atualizar(
                        "situacaoConjugalPais",
                        e.target.value
                      )
                    }
                  />


                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Você tem pais falecidos?
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">

                      <ChoiceCard
                        selected={dados.paisFalecidos === "Não"}
                        title="Não"
                        onClick={() => {
                          atualizar("paisFalecidos", "Não");
                          atualizar("qualPaiMaeFalecido", "");
                        }}
                      />

                      <ChoiceCard
                        selected={dados.paisFalecidos === "Sim"}
                        title="Sim"
                        onClick={() =>
                          atualizar("paisFalecidos", "Sim")
                        }
                      />

                    </div>

                  </div>


                  {dados.paisFalecidos === "Sim" && (

                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Qual?
                      </label>

                      <div className="grid sm:grid-cols-3 gap-4">

                        {["Pai", "Mãe", "Ambos"].map((opcao) => (

                          <ChoiceCard
                            key={opcao}
                            selected={
                              dados.qualPaiMaeFalecido === opcao
                            }
                            title={opcao}
                            onClick={() =>
                              atualizar(
                                "qualPaiMaeFalecido",
                                opcao
                              )
                            }
                          />

                        ))}

                      </div>

                    </div>

                  )}


                  <div className="grid md:grid-cols-2 gap-6">

                    <Input
                      label="Quantas pessoas vivem da renda familiar?"
                      name="pessoasRendaFamiliar"
                      value={dados.pessoasRendaFamiliar}
                      type="number"
                      min="1"
                      placeholder="Quantidade"
                      onChange={(e) =>
                        atualizar(
                          "pessoasRendaFamiliar",
                          e.target.value
                        )
                      }
                    />

                    <Select
                      label="Qual a renda mensal da família?"
                      name="rendaFamiliar"
                      value={dados.rendaFamiliar}
                      options={[
                        "Menos de 1 salário mínimo",
                        "Até 1 salário mínimo",
                        "Até 2 salários mínimos",
                        "De 2 até 4 salários mínimos",
                        "Superior a 5 salários mínimos",
                        "Outro",
                        "Prefiro não informar",
                      ]}
                      onChange={(e) => {
                        atualizar(
                          "rendaFamiliar",
                          e.target.value
                        );

                        if (e.target.value !== "Outro") {
                          atualizar("outraRenda", "");
                        }
                      }}
                    />

                  </div>


                  {dados.rendaFamiliar === "Outro" && (

                    <Input
                      label="Informe a renda familiar"
                      name="outraRenda"
                      value={dados.outraRenda}
                      placeholder="Informe o valor ou situação"
                      onChange={(e) =>
                        atualizar("outraRenda", e.target.value)
                      }
                    />

                  )}

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 7 — NECESSIDADES ESPECÍFICAS
            ================================================== */}

            {etapa === 7 && (

              <div>

                <SectionTitle
                  icon="🧩"
                  title="Necessidades específicas e inclusão"
                  description="Essas informações são opcionais e nos ajudam a oferecer um ambiente mais acolhedor, seguro e inclusivo."
                />

                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-8">

                  <p className="text-sm text-gray-700 leading-relaxed">
                    Queremos conhecer melhor as necessidades de cada
                    aluno. Essas informações serão utilizadas exclusivamente
                    para fins de acolhimento, inclusão, segurança e
                    acompanhamento das atividades do Projeto Som do Alto.
                  </p>

                  <p className="text-sm text-gray-700 leading-relaxed mt-3">
                    Você não precisa fornecer diagnóstico, laudo ou
                    informações médicas detalhadas.
                  </p>

                </div>


                <div className="space-y-8">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      O aluno possui alguma deficiência, condição do
                      neurodesenvolvimento ou necessidade específica
                      que devemos conhecer?
                    </label>

                    <div className="grid md:grid-cols-3 gap-4">

                      {[
                        "Não",
                        "Sim",
                        "Prefiro não informar",
                      ].map((opcao) => (

                        <ChoiceCard
                          key={opcao}
                          selected={
                            dados.possuiNecessidade === opcao
                          }
                          title={opcao}
                          onClick={() => {
                            atualizar(
                              "possuiNecessidade",
                              opcao
                            );

                            if (opcao !== "Sim") {
                              atualizar(
                                "necessidadesEspecificas",
                                []
                              );
                              atualizar(
                                "outraNecessidade",
                                ""
                              );
                              atualizar(
                                "informacaoAcolhimento",
                                ""
                              );
                              atualizar(
                                "adaptacoes",
                                []
                              );
                              atualizar(
                                "outraAdaptacao",
                                ""
                              );
                            }
                          }}
                        />

                      ))}

                    </div>

                  </div>


                  {dados.possuiNecessidade === "Sim" && (

                    <>

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Qual(is)?
                        </label>

                        <div className="grid md:grid-cols-2 gap-4">

                          {[
                            "Transtorno do Espectro Autista (TEA)",
                            "TDAH",
                            "Deficiência intelectual",
                            "Deficiência física",
                            "Deficiência visual",
                            "Deficiência auditiva",
                            "Deficiência múltipla",
                            "Transtorno específico de aprendizagem",
                            "Altas habilidades/superdotação",
                            "Outra condição ou necessidade específica",
                          ].map((opcao) => (

                            <CheckCard
                              key={opcao}
                              label={opcao}
                              checked={dados.necessidadesEspecificas.includes(
                                opcao
                              )}
                              onChange={() =>
                                toggleLista(
                                  "necessidadesEspecificas",
                                  opcao
                                )
                              }
                            />

                          ))}

                        </div>

                      </div>


                      {dados.necessidadesEspecificas.includes(
                        "Outra condição ou necessidade específica"
                      ) && (

                        <Input
                          label="Qual?"
                          name="outraNecessidade"
                          value={dados.outraNecessidade}
                          placeholder="Informe, se desejar"
                          onChange={(e) =>
                            atualizar(
                              "outraNecessidade",
                              e.target.value
                            )
                          }
                        />

                      )}


                      <Textarea
                        label="Existe alguma informação importante que a equipe do projeto deve conhecer?"
                        name="informacaoAcolhimento"
                        value={dados.informacaoAcolhimento}
                        placeholder="Campo opcional. Não é necessário informar diagnóstico ou detalhes médicos."
                        onChange={(e) =>
                          atualizar(
                            "informacaoAcolhimento",
                            e.target.value
                          )
                        }
                      />


                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Existe alguma adaptação ou cuidado que pode ajudar o aluno durante as atividades?
                        </label>

                        <div className="grid md:grid-cols-2 gap-4">

                          {[
                            "Instruções mais objetivas",
                            "Apoio para organização/atenção",
                            "Mais tempo para algumas atividades",
                            "Sensibilidade a sons ou ambientes muito barulhentos",
                            "Recurso de acessibilidade",
                            "Acompanhamento específico",
                            "Nenhuma adaptação conhecida",
                            "Outra",
                          ].map((opcao) => (

                            <CheckCard
                              key={opcao}
                              label={opcao}
                              checked={dados.adaptacoes.includes(
                                opcao
                              )}
                              onChange={() =>
                                toggleLista(
                                  "adaptacoes",
                                  opcao
                                )
                              }
                            />

                          ))}

                        </div>

                      </div>


                      {dados.adaptacoes.includes("Outra") && (

                        <Input
                          label="Qual adaptação ou cuidado?"
                          name="outraAdaptacao"
                          value={dados.outraAdaptacao}
                          placeholder="Informe, se desejar"
                          onChange={(e) =>
                            atualizar(
                              "outraAdaptacao",
                              e.target.value
                            )
                          }
                        />

                      )}

                    </>

                  )}

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 8 — RESIDÊNCIA
            ================================================== */}

            {etapa === 8 && (

              <div>

                <SectionTitle
                  icon="🏡"
                  title="Bens e condições da residência"
                  description="Informe a quantidade aproximada de cada item existente na residência."
                />

                <div className="grid md:grid-cols-2 gap-5">

                  {[
                    ["televisao", "Televisão"],
                    ["geladeira", "Geladeira"],
                    ["maquinaLavar", "Máquina de lavar roupa"],
                    ["microondas", "Micro-ondas"],
                    ["computadorNotebook", "Microcomputador ou Notebook"],
                    ["celular", "Telefone Celular"],
                    ["carro", "Carro"],
                    ["moto", "Moto"],
                  ].map(([name, label]) => (

                    <div
                      key={name}
                      className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between"
                    >

                      <span className="font-semibold text-gray-700">
                        {label}
                      </span>

                      <input
                        type="number"
                        name={name}
                        min="0"
                        value={
                          dados[name as keyof FormData] as string
                        }
                        onChange={(e) =>
                          atualizar(
                            name as keyof FormData,
                            e.target.value as never
                          )
                        }
                        className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-center outline-none focus:border-orange-500"
                      />

                    </div>

                  ))}


                  <div className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between">

                    <span className="font-semibold text-gray-700">
                      Acesso à Internet
                    </span>

                    <select
                      name="internet"
                      value={dados.internet}
                      onChange={(e) =>
                        atualizar("internet", e.target.value)
                      }
                      className="border border-gray-200 rounded-xl px-3 py-2 bg-white outline-none focus:border-orange-500"
                    >

                      <option value="">
                        Selecione
                      </option>

                      <option value="Sim">
                        Sim
                      </option>

                      <option value="Não">
                        Não
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 9 — INFORMAÇÕES FINAIS
            ================================================== */}

            {etapa === 9 && (

              <div>

                <SectionTitle
                  icon="👕"
                  title="Informações finais"
                  description="Essas informações ajudam na organização das atividades do projeto."
                />

                <div className="grid md:grid-cols-2 gap-6">

                  <Select
                    label="Onde você conheceu o projeto?"
                    name="comoConheceu"
                    value={dados.comoConheceu}
                    options={[
                      "Instagram",
                      "Facebook",
                      "YouTube",
                      "WhatsApp",
                      "Amigos ou familiares",
                      "COMPAZ",
                      "Evento ou apresentação",
                      "Outro",
                    ]}
                    onChange={(e) =>
                      atualizar(
                        "comoConheceu",
                        e.target.value
                      )
                    }
                  />

                  <Input
                    label="Número do calçado"
                    name="numeroCalcado"
                    value={dados.numeroCalcado}
                    placeholder="Ex.: 36"
                    onChange={(e) =>
                      atualizar(
                        "numeroCalcado",
                        e.target.value
                      )
                    }
                  />

                  <Select
                    label="Tamanho da camisa"
                    name="tamanhoCamisa"
                    value={dados.tamanhoCamisa}
                    options={[
                      "PP",
                      "P",
                      "M",
                      "G",
                      "GG",
                      "XG",
                    ]}
                    onChange={(e) =>
                      atualizar(
                        "tamanhoCamisa",
                        e.target.value
                      )
                    }
                  />

                  <Select
                    label="Tamanho da calça ou saia"
                    name="tamanhoCalcaSaia"
                    value={dados.tamanhoCalcaSaia}
                    options={[
                      "34",
                      "36",
                      "38",
                      "40",
                      "42",
                      "44",
                      "46",
                      "48",
                      "Outro",
                    ]}
                    onChange={(e) =>
                      atualizar(
                        "tamanhoCalcaSaia",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            )}


            {/* =================================================
                ETAPA 10 — AUTORIZAÇÃO
            ================================================== */}

            {etapa === 10 && (

              <div>

                <SectionTitle
                  icon="📸"
                  title="Autorização de uso de imagem"
                  description="Leia atentamente as informações antes de realizar sua escolha."
                />

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">

                  <p className="text-gray-700 leading-relaxed">
                    O Projeto Som do Alto ocasionalmente documenta suas
                    atividades através de fotografias e vídeos, que podem
                    ser utilizados em nosso site, televisão, rádio,
                    internet, redes sociais, congressos, seminários,
                    reuniões, palestras, eventos, materiais promocionais
                    e outras plataformas relacionadas ao projeto.
                  </p>

                  <p className="text-gray-700 leading-relaxed mt-4">
                    Essas imagens têm como objetivo registrar as atividades,
                    divulgar o trabalho desenvolvido e compartilhar os
                    resultados do projeto com a sociedade.
                  </p>

                  <p className="text-gray-700 leading-relaxed mt-4">
                    A participação é voluntária e a autorização poderá ser
                    concedida ou recusada.
                  </p>

                </div>


                <div className="space-y-4">

                  <ChoiceCard
                    selected={dados.autorizaImagem === "SIM"}
                    icon="✅"
                    title="SIM, AUTORIZO"
                    description="Autorizo o uso da imagem do aluno nas condições apresentadas acima."
                    onClick={() =>
                      atualizar("autorizaImagem", "SIM")
                    }
                  />

                  <ChoiceCard
                    selected={dados.autorizaImagem === "NAO"}
                    icon="❌"
                    title="NÃO AUTORIZO"
                    description="Não autorizo o uso da imagem do aluno."
                    onClick={() => {
                      atualizar("autorizaImagem", "NAO");
                    }}
                  />

                </div>


                {dados.autorizaImagem === "NAO" && (

                  <div className="mt-6">

                    <Textarea
                      label="Justificativa"
                      name="justificativaNaoAutoriza"
                      value={dados.justificativaNaoAutoriza}
                      placeholder="Se desejar, informe o motivo da não autorização."
                      onChange={(e) =>
                        atualizar(
                          "justificativaNaoAutoriza",
                          e.target.value
                        )
                      }
                    />

                  </div>

                )}


                <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-6">

                  <label className="flex gap-4 cursor-pointer">

                    <input
                      type="checkbox"
                      name="declaracaoVeracidade"
                      checked={dados.declaracaoVeracidade}
                      onChange={(e) =>
                        atualizar(
                          "declaracaoVeracidade",
                          e.target.checked
                        )
                      }
                      required
                      className="mt-1 w-5 h-5 accent-orange-500 shrink-0"
                    />

                    <span className="text-sm text-gray-700 leading-relaxed">
                      Declaro que as informações fornecidas neste
                      formulário são verdadeiras e estou ciente de que
                      os dados serão utilizados para fins relacionados
                      à inscrição e acompanhamento do aluno no Projeto
                      Som do Alto.
                    </span>

                  </label>

                </div>

              </div>

            )}


            {/* =================================================
                NAVEGAÇÃO
            ================================================== */}

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-10 pt-8 border-t border-gray-100">

              {indiceAtual > 0 ? (

                <button
                  type="button"
                  onClick={etapaAnterior}
                  className="px-7 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition"
                >
                  ← Voltar
                </button>

              ) : (

                <div />

              )}


              {indiceAtual < totalEtapas - 1 ? (

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition sm:ml-auto"
                >
                  Continuar →
                </button>

              ) : (

                <button
                  type="submit"
                  disabled={enviando}
                  className={`bg-orange-500 text-white px-8 py-3 rounded-xl font-bold transition sm:ml-auto ${
                    enviando
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-orange-600"
                  }`}
                >
                  {enviando ? "Enviando..." : "Enviar Inscrição"}
                </button>

              )}

            </div>

          </form>

        </div>

      </section>

      {/* =====================================================
          MODAL DE ENVIO
      ====================================================== */}

      {enviando && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mx-auto mb-5 w-16 h-16 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin" />

            <h2 className="text-2xl font-bold text-gray-900">
              Enviando sua inscrição...
            </h2>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Aguarde enquanto seus dados e documentos são enviados.
            </p>

            <p className="text-sm text-orange-600 font-semibold mt-4">
              Não feche esta página.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL DE SUCESSO
      ====================================================== */}

      {inscricaoEnviada && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
              ✓
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Inscrição realizada com sucesso!
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              Sua inscrição foi recebida pelo Projeto Som do Alto.
            </p>

            {numeroInscricao && (
              <div className="mt-5 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                <p className="text-sm text-gray-500">
                  Número da inscrição
                </p>

                <p className="text-xl font-bold text-orange-600 mt-1">
                  {numeroInscricao}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setInscricaoEnviada(false);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

    </main>
  );
}


/* =============================================================
   COMPONENTES AUXILIARES
============================================================= */

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-8">

      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>

      <div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="text-gray-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}


function Input({
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  full = false,
  onChange,
  min,
  readOnly = false,
}: {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  min?: string;
  readOnly?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        min={min}
        readOnly={readOnly}
        onChange={onChange}
        className={`w-full border border-gray-200 rounded-xl px-4 py-3 outline-none transition ${
          readOnly
            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
            : "focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        }`}
      />

    </div>
  );
}


function Select({
  label,
  name,
  value,
  options,
  required = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
      >

        <option value="">
          Selecione
        </option>

        {options.map((option) => (

          <option key={option} value={option}>
            {option}
          </option>

        ))}

      </select>

    </div>
  );
}


function Textarea({
  label,
  name,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        rows={4}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
      />

    </div>
  );
}


function ChoiceCard({
  selected,
  icon,
  title,
  description,
  onClick,
}: {
  selected: boolean;
  icon?: string;
  title: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border-2 rounded-2xl p-5 transition ${
        selected
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 hover:border-orange-300"
      }`}
    >

      <div className="flex items-center gap-4">

        {icon && (
          <div className="text-3xl">
            {icon}
          </div>
        )}

        <div>

          <p className="font-bold text-gray-900">
            {title}
          </p>

          {description && (
            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>
          )}

        </div>

      </div>

    </button>
  );
}


function CheckCard({
  label,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 border-2 rounded-2xl p-4 transition ${
        disabled
          ? "opacity-40 cursor-not-allowed border-gray-200"
          : checked
          ? "border-orange-500 bg-orange-50 cursor-pointer"
          : "border-gray-200 hover:border-orange-300 cursor-pointer"
      }`}
    >

      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="w-5 h-5 accent-orange-500 shrink-0"
      />

      <span className="text-sm font-semibold text-gray-700">
        {label}
      </span>

    </label>
  );
}


function FileBox({
  title,
  description,
  name,
  accept,
  value,
  onChange,
}: {
  title: string;
  description: string;
  name: string;
  accept: string;
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-orange-300 transition">

      <div className="flex items-start gap-4">

        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl shrink-0">
          📎
        </div>

        <div className="flex-1">

          <h3 className="font-bold text-lg text-gray-900">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            {description}
          </p>

          <input
            type="file"
            name={name}
            accept={accept}
            onChange={(e) =>
              onChange(e.target.files?.[0] || null)
            }
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-orange-100 file:text-orange-700 file:font-semibold hover:file:bg-orange-200"
          />

          {value && (
            <p className="text-sm text-green-600 font-semibold mt-3">
              ✓ {value.name}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}
