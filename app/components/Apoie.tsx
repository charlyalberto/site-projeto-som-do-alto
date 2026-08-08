"use client";

import { useState } from "react";
import QRCode from "qrcode";

type PixData = {
  valor: string;
  imagem: string;
  codigo: string;
};

export default function Apoie() {
  const [pixSelecionado, setPixSelecionado] = useState<PixData | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [outroValor, setOutroValor] = useState("");

  /*
   * ============================================================
   * DADOS PIX FIXOS
   * ============================================================
   */

  const pix = {
    "30": {
      valor: "R$ 30,00",
      imagem: "/images/pix/30.jpeg",
      codigo:
        "00020126360014BR.GOV.BCB.PIX011450972946000198520400005303986540530.005802BR5925PROJETO SOCIOMUSICAL SOM 6006RECIFE622605226xesjY6i1YZn7YUya1pGQv630495BB",
    },

    "50": {
      valor: "R$ 50,00",
      imagem: "/images/pix/50.jpeg",
      codigo:
        "00020126360014BR.GOV.BCB.PIX011450972946000198520400005303986540550.005802BR5925PROJETO SOCIOMUSICAL SOM 6006RECIFE622605227OJM8ohqaxJu4ZnMGOarfV630488FC",
    },

    "100": {
      valor: "R$ 100,00",
      imagem: "/images/pix/100.jpeg",
      codigo:
        "00020126360014BR.GOV.BCB.PIX0114509729460001985204000053039865406100.005802BR5925PROJETO SOCIOMUSICAL SOM 6006RECIFE622605224InEFEgPA8JEBmAhmAZSDm6304AC34",
    },

    "200": {
      valor: "R$ 200,00",
      imagem: "/images/pix/200.jpeg",
      codigo:
        "00020126360014BR.GOV.BCB.PIX0114509729460001985204000053039865406200.005802BR5925PROJETO SOCIOMUSICAL SOM 6006RECIFE622605225d2dW12EJdwzahB6RnATuA6304B9DE",
    },
  };

  /*
   * ============================================================
   * CRC16 DO PIX
   * ============================================================
   */

  function crc16(payload: string) {
    let crc = 0xffff;

    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;

      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }

        crc &= 0xffff;
      }
    }

    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  /*
   * ============================================================
   * MONTA CAMPO PIX
   * ============================================================
   */

  function campoPix(id: string, valor: string) {
    return `${id}${valor.length.toString().padStart(2, "0")}${valor}`;
  }

  /*
   * ============================================================
   * GERA PIX DINÂMICO
   * ============================================================
   */

  async function gerarPixDinamico(valorNumerico: number) {
    const valor = valorNumerico.toFixed(2);

    const chavePix = "50972946000198";

    const nomeRecebedor = "PROJETO SOCIOMUSICAL SOM";
    const cidade = "RECIFE";

    /*
     * Merchant Account Information
     */
    const merchantAccount =
      campoPix("00", "BR.GOV.BCB.PIX") +
      campoPix("01", chavePix);

    /*
     * Additional Data Field
     *
     * TXID "***" para PIX estático.
     */
    const additionalData = campoPix(
      "05",
      "***"
    );

    /*
     * Montagem do payload sem o CRC
     */
    const payload =
      campoPix("00", "01") +
      campoPix("26", merchantAccount) +
      campoPix("52", "0000") +
      campoPix("53", "986") +
      campoPix("54", valor) +
      campoPix("58", "BR") +
      campoPix("59", nomeRecebedor) +
      campoPix("60", cidade) +
      campoPix("62", additionalData) +
      "6304";

    /*
     * CRC16
     */
    const crc = crc16(payload);

    const codigoPix = payload + crc;

    /*
     * Gera o QR Code
     */
    const imagemQRCode = await QRCode.toDataURL(codigoPix, {
      width: 500,
      margin: 2,
    });

    return {
      valor: valorNumerico.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      imagem: imagemQRCode,
      codigo: codigoPix,
    };
  }

  /*
   * ============================================================
   * ABRIR PIX FIXO
   * ============================================================
   */

  const abrirPix = (valor: "30" | "50" | "100" | "200") => {
    setCopiado(false);
    setPixSelecionado(pix[valor]);
  };

  /*
   * ============================================================
   * OUTRO VALOR
   * ============================================================
   */

  const abrirOutroValor = async () => {
    const valorLimpo = outroValor
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".");

    const valorNumerico = Number(valorLimpo);

    if (!valorNumerico || valorNumerico <= 0) {
      alert("Digite um valor válido para realizar sua contribuição.");
      return;
    }

    if (valorNumerico < 1) {
      alert("O valor mínimo para contribuição é R$ 1,00.");
      return;
    }

    try {
      const novoPix = await gerarPixDinamico(valorNumerico);

      setCopiado(false);
      setPixSelecionado(novoPix);

    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível gerar o PIX. Tente novamente."
      );
    }
  };

  /*
   * ============================================================
   * COPIAR PIX
   * ============================================================
   */

  const copiarPix = async () => {
    if (!pixSelecionado) return;

    try {
      await navigator.clipboard.writeText(
        pixSelecionado.codigo
      );

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 3000);

    } catch {
      alert("Não foi possível copiar o código PIX.");
    }
  };

  /*
   * ============================================================
   * FECHAR MODAL
   * ============================================================
   */

  const fecharModal = () => {
    setPixSelecionado(null);
    setCopiado(false);
  };

  return (
    <section id="apoie">

      {/* =========================================================
          BLOCO PRINCIPAL
      ========================================================== */}

      <div className="bg-orange-500 py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <span className="text-orange-100 font-bold uppercase tracking-widest text-sm">
              Faça parte dessa transformação
            </span>

            <h2 className="text-5xl md:text-6xl font-bold text-white mt-3 mb-6">
              A Música Transforma. Você Pode Fazer Parte.
            </h2>

            <p className="text-orange-50 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Sua contribuição ajuda o Projeto Som do Alto a manter suas
              atividades gratuitas e ampliar as oportunidades para crianças
              e adolescentes da Zona Norte do Recife.
            </p>

          </div>


          {/* =====================================================
              CARDS
          ====================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* DOAÇÃO ÚNICA */}

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">

              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-4xl mb-6">
                ❤️
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Doação Única
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Faça uma contribuição única e ajude diretamente na manutenção
                das atividades do projeto.
              </p>

              <div className="mt-auto">

                <div className="grid grid-cols-2 gap-3 mb-4">

                  <button
                    onClick={() => abrirPix("30")}
                    className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition"
                  >
                    R$ 30
                  </button>

                  <button
                    onClick={() => abrirPix("50")}
                    className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition"
                  >
                    R$ 50
                  </button>

                  <button
                    onClick={() => abrirPix("100")}
                    className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition"
                  >
                    R$ 100
                  </button>

                  <button
                    onClick={() => abrirPix("200")}
                    className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition"
                  >
                    R$ 200
                  </button>

                </div>


                {/* OUTRO VALOR */}

                <input
                  type="text"
                  value={outroValor}
                  onChange={(e) =>
                    setOutroValor(e.target.value)
                  }
                  placeholder="Outro valor"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-4 outline-none focus:border-orange-500 transition"
                />

                <button
                  onClick={abrirOutroValor}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                >
                  Doar Agora
                </button>

              </div>

            </div>


            {/* =====================================================
                MANTENEDOR
            ====================================================== */}

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">

              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-4xl mb-6">
                🔄
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Seja um Mantenedor
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Uma contribuição mensal ajuda a garantir a continuidade das
                atividades e permite que o projeto planeje seu futuro.
              </p>

              <div className="mt-auto">

                <div className="grid grid-cols-2 gap-3 mb-6">

                  <button className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition">
                    R$ 30/mês
                  </button>

                  <button className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition">
                    R$ 50/mês
                  </button>

                  <button className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition">
                    R$ 100/mês
                  </button>

                  <button className="border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-semibold py-3 rounded-xl transition">
                    Outro valor
                  </button>

                </div>

                <button
                  onClick={() =>
                    alert(
                      "Em breve disponibilizaremos a opção de contribuição mensal."
                    )
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                >
                  Quero Ser Mantenedor
                </button>

              </div>

            </div>


            {/* =====================================================
                EMPRESAS
            ====================================================== */}

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">

              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-4xl mb-6">
                🤝
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Empresas e Instituições
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Sua empresa ou instituição pode se tornar parceira do Som do
                Alto e contribuir para ampliar nosso impacto social.
              </p>

              <div className="mt-auto">

                <div className="space-y-3 mb-6">

                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="text-orange-500 font-bold">
                      ✓
                    </span>
                    Apoio financeiro
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="text-orange-500 font-bold">
                      ✓
                    </span>
                    Apoio com materiais
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="text-orange-500 font-bold">
                      ✓
                    </span>
                    Apoio institucional
                  </div>

                </div>

                <a
                  href="#contato"
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                >
                  Quero Ser Parceiro
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================================
          ONDE SUA CONTRIBUIÇÃO PODE AJUDAR
      ========================================================== */}

      <div className="bg-gray-50 py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
              Seu apoio se transforma em oportunidade
            </span>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Onde sua contribuição pode ajudar
            </h3>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              Cada contribuição pode ajudar o projeto a manter sua estrutura
              e oferecer melhores condições para nossos alunos.
            </p>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎼</div>
              <p className="text-gray-900 font-semibold">
                Instrumentos
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-gray-900 font-semibold">
                Material musical
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🥪</div>
              <p className="text-gray-900 font-semibold">
                Alimentação
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎶</div>
              <p className="text-gray-900 font-semibold">
                Atividades
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="text-4xl mb-4">👕</div>
              <p className="text-gray-900 font-semibold">
                Uniformes
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎤</div>
              <p className="text-gray-900 font-semibold">
                Apresentações
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =========================================================
          FECHAMENTO
      ========================================================== */}

      <div className="bg-white py-20 px-6">

        <div className="max-w-3xl mx-auto text-center">

          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
            🤝
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            Seu apoio faz parte da nossa história
          </h3>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
            Cada contribuição ajuda a manter viva a oportunidade de aprender
            música gratuitamente e de transformar talentos em novas
            possibilidades para o futuro.
          </p>

          <a
            href="#contato"
            className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-md hover:shadow-lg"
          >
            ❤️ Quero Apoiar o Projeto
          </a>

        </div>

      </div>


      {/* =========================================================
          MODAL PIX
      ========================================================== */}

      {pixSelecionado && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={fecharModal}
        >

          <div
            className="relative w-full max-w-md max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >

            {/* FECHAR */}

            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl transition"
              aria-label="Fechar"
            >
              ×
            </button>


            {/* CABEÇALHO */}

            <div className="text-center mb-5">

              <div className="text-4xl mb-3">
                ❤️
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                Apoie o Projeto Som do Alto
              </h3>

              <p className="text-gray-500 mt-2">
                Sua contribuição
              </p>

              <p className="text-3xl font-bold text-orange-600 mt-1">
                {pixSelecionado.valor}
              </p>

            </div>


            {/* QR CODE */}

            <div className="bg-gray-50 rounded-2xl p-4 flex justify-center mb-5">

              <img
                src={pixSelecionado.imagem}
                alt={`QR Code PIX de ${pixSelecionado.valor}`}
                className="w-full max-w-[280px] h-auto object-contain"
              />

            </div>


            {/* INSTRUÇÃO */}

            <div className="text-center mb-5">

              <p className="font-semibold text-gray-900">
                Escaneie o QR Code
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Abra o aplicativo do seu banco e utilize a opção
                de pagamento por PIX.
              </p>

            </div>


            {/* PIX COPIA E COLA */}

            <div>

              <p className="font-semibold text-gray-900 mb-2">
                PIX Copia e Cola
              </p>

              <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">

                <p className="text-xs text-gray-500 break-all leading-relaxed max-h-24 overflow-y-auto">
                  {pixSelecionado.codigo}
                </p>

              </div>


              <button
                onClick={copiarPix}
                className={`w-full mt-3 py-3 rounded-xl font-bold text-white transition ${
                  copiado
                    ? "bg-green-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {copiado
                  ? "✓ Código copiado!"
                  : "📋 Copiar código PIX"}
              </button>

            </div>


            {/* AVISO */}

            <div className="mt-5 bg-orange-50 rounded-xl p-4 text-center">

              <p className="text-sm text-gray-600">
                Confira os dados do beneficiário e o valor antes
                de confirmar o pagamento no aplicativo do seu banco.
              </p>

            </div>


            <button
              onClick={fecharModal}
              className="w-full mt-4 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition"
            >
              Fechar
            </button>

          </div>

        </div>

      )}

    </section>
  );
}