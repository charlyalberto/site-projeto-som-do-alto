"use client";

type ModalEnviandoProps = {
  aberto: boolean;
};

export default function ModalEnviando({
  aberto,
}: ModalEnviandoProps) {
  if (!aberto) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">

        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

        <h2 className="text-xl font-bold text-gray-900">
          Enviando sua inscrição...
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Estamos enviando seus dados e documentos.
          <br />
          Aguarde um momento e não feche esta página.
        </p>

      </div>
    </div>
  );
}