"use client";

import SectionTitle from "./ui/SectionTitle";
import FileBox from "./ui/FileBox";

type EtapaDocumentosProps = {
  certidaoNascimento: File | null;
  fotoAluno: File | null;

  atualizar: (
    campo: "certidaoNascimento" | "fotoAluno",
    valor: File | null
  ) => void;
};

export default function EtapaDocumentos({
  certidaoNascimento,
  fotoAluno,
  atualizar,
}: EtapaDocumentosProps) {
  return (
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
          value={certidaoNascimento}
          onChange={(file) =>
            atualizar(
              "certidaoNascimento",
              file
            )
          }
        />

        <FileBox
          title="Foto do aluno"
          description="Envie uma foto atual, bem iluminada e com o rosto claramente visível."
          name="fotoAluno"
          accept="image/*"
          value={fotoAluno}
          onChange={(file) =>
            atualizar(
              "fotoAluno",
              file
            )
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
  );
}