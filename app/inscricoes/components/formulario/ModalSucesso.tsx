"use client";

type ModalSucessoProps = {
  aberto: boolean;
  numeroInscricao: string;
  onContinuar: () => void;
};

export default function ModalSucesso({
  aberto,
  numeroInscricao,
  onContinuar,
}: ModalSucessoProps) {
  if (!aberto) {
    return null;
  }

  return (
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
          onClick={onContinuar}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
        >
          Continuar
        </button>

      </div>
    </div>
  );
}