"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuemSomos from "./components/QuemSomos";
import Historia from "./components/Historia";
import Impacto from "./components/Impacto";
import Galeria from "./components/Galeria";
import Cursos from "./components/Cursos";
import Videos from "./components/Videos";
import Parceiros from "./components/Parceiros";
import Apoie from "./components/Apoie";
import Depoimentos from "./components/Depoimentos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      <div className="pt-20">
        <Hero />
      </div>

      <QuemSomos />
      <Historia />
      <Impacto />
      <Galeria />
      <Cursos />
      <Videos />
      <Parceiros />
      <Apoie />
      <Depoimentos />
      <Contato />
      <Footer />

    </main>
  );
}