"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import IntroSplash from "@/components/IntroSplash";

// Import centralized data
import { artworks } from "@/lib/data";

// Filter by type
const lienzos = artworks.filter(a => a.type === "lienzo");

// -- COMPONENTS -- //
export default function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Lienzos", href: "#lienzos" },
    { name: "Sobre mí", href: "#sobre-mi" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <main className="relative bg-white text-[#0B1F3A] font-sans">
      <IntroSplash />
      
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link
            href="/"
            className={`font-playfair text-2xl font-bold tracking-widest ${
              scrolled ? "text-[#0B1F3A]" : "text-white"
            } transition-colors`}
          >
            NAUT
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  scrolled
                    ? "text-[#0B1F3A] hover:text-[#3A6EA5]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={scrolled ? "text-[#0B1F3A]" : "text-white hover:text-white hover:bg-white/10"}>
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-0 w-[300px] flex flex-col justify-center gap-10">
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-playfair text-3xl font-light text-[#0B1F3A] hover:text-[#3A6EA5] transition-colors gap-y-4 pl-10"
                  >
                    {link.name}
                  </a>
                ))}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative w-full h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0B1F3A]/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center"
        >
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-extralight mb-6 drop-shadow-lg tracking-widest uppercase">
            NAUT <span className="block text-2xl md:text-4xl mt-2 font-light normal-case">by Blanca Sanchez</span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light opacity-90 max-w-2xl mb-12 tracking-wide">
            Arte inspirado en el mar y la tradicion
          </p>
          <Button
            asChild
            className="bg-white text-[#0B1F3A] hover:bg-[#F5F7FA] px-10 py-6 text-sm uppercase tracking-widest rounded-none shadow-lg transition-transform hover:scale-105"
          >
            <a href="#lienzos">Ver colección</a>
          </Button>
        </motion.div>
      </section>

      {/* INTRODUCTION */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-32 px-6 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl text-[#0B1F3A] leading-relaxed font-light italic">
            Colección de obras únicas inspiradas en la navegación, el mar y la libertad.
          </h2>
        </div>
      </motion.section>

      {/* LIENZOS */}
      <motion.section 
        id="lienzos" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="bg-white py-24 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="font-playfair text-4xl text-[#0B1F3A] mb-4">Lienzos</h3>
              <div className="w-12 h-0.5 bg-[#3A6EA5] mb-6"></div>
              <p className="text-[#0B1F3A]/70 leading-relaxed font-light">
                Obras únicas en lienzo con mayor presencia y profundidad, pensadas para espacios que buscan carácter y serenidad.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-none border-[#0B1F3A]/20 text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white transition-all uppercase tracking-widest text-xs px-8 py-6">
              <Link href="/lienzos">Ver colección completa</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {lienzos.slice(0, 3).map((art) => (
              <ArtCard key={art.id} art={art} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* SOBRE MÍ */}
      <motion.section 
        id="sobre-mi" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#F5F7FA] py-24 px-6 lg:px-12"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-xl">
              <Image
                src="/images/blanca-sanchez.jpg"
                alt="Blanca Sánchez - Artista"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 space-y-8 text-left"
          >
            <h3 className="font-playfair text-4xl text-[#0B1F3A]">Sobre mí</h3>
            <div className="w-12 h-0.5 bg-[#3A6EA5]"></div>
            <div className="text-lg text-[#0B1F3A]/80 font-light leading-relaxed space-y-6">
              <p>
                Soy Blanca Sánchez, artista sevillana inspirada por el mar y la navegación.
              </p>
              <p>
                Mi obra nace de la observación de la vela y la fotografía marítima, e inspiracion en tecnica de muchos artistas, transformando el movimiento en composiciones contemporáneas de gran fuerza visual.
              </p>
              <p>
                A través de la textura, el contraste y la síntesis de las formas, busco capturar la esencia del salitre.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CONTACTO */}
      <motion.section 
        id="contacto" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-white py-32 px-6 lg:px-12"
      >
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-playfair text-4xl text-[#0B1F3A] mb-4">Contacto</h3>
          <div className="w-12 h-0.5 bg-[#3A6EA5] mx-auto mb-8"></div>
          <p className="text-[#0B1F3A]/80 font-light mb-12">
            Si estás interesado en alguna obra o quieres un encargo personalizado, puedes escribirme directamente.
          </p>

          <form className="flex flex-col gap-6 text-left" onSubmit={(e) => { e.preventDefault(); window.location.href="mailto:blancasanchemzarin0@gmail.com?subject=Consulta%20General"; }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0B1F3A]/60 uppercase tracking-widest pl-1">
                  Nombre
                </label>
                <Input
                  className="rounded-none border-b border-t-0 border-r-0 border-l-0 border-[#0B1F3A]/30 focus-visible:ring-0 focus-visible:border-[#0B1F3A] bg-transparent px-2 py-6"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0B1F3A]/60 uppercase tracking-widest pl-1">
                  Email
                </label>
                <Input
                  type="email"
                  className="rounded-none border-b border-t-0 border-r-0 border-l-0 border-[#0B1F3A]/30 focus-visible:ring-0 focus-visible:border-[#0B1F3A] bg-transparent px-2 py-6"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-[#0B1F3A]/60 uppercase tracking-widest pl-1">
                Mensaje
              </label>
              <Textarea
                className="rounded-none border-b border-t-0 border-r-0 border-l-0 border-[#0B1F3A]/30 focus-visible:ring-0 focus-visible:border-[#0B1F3A] bg-transparent px-2 py-4 resize-none"
                placeholder="Hola, me interesa encargar una lámina..."
                rows={4}
              />
            </div>
            
            <div className="mt-8 text-center sm:text-left">
              <span className="block mb-6 text-[#0B1F3A] font-medium">
                Email directo: <a href="mailto:blancasanchemzarin0@gmail.com" className="text-[#3A6EA5] hover:underline">blancasanchemzarin0@gmail.com</a>
              </span>
              <Button type="submit" className="bg-[#0B1F3A] text-white hover:bg-[#3A6EA5] px-12 py-6 text-sm uppercase tracking-widest rounded-none shadow-md transition-all">
                Enviar mensaje
              </Button>
            </div>
          </form>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h4 className="font-playfair text-3xl font-bold mb-2 tracking-widest">NAUT</h4>
            <p className="text-white/60 text-sm font-light">by Blanca Sanchez</p>
          </div>

          <div className="flex gap-8 text-sm font-light text-white/80">
            <a href="#lienzos" className="hover:text-white transition-colors">Lienzos</a>
            <a href="#sobre-mi" className="hover:text-white transition-colors">Sobre mí</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
        <div className="mt-16 text-center text-xs text-white/40 font-light">
          © 2026 Náutica Arte. Todos los derechos reservados.
        </div>
      </footer>
    </main>
  );
}

// Obra card linking to independent page
function ArtCard({ art }: { art: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/obra/${art.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6 group-hover:shadow-xl transition-all duration-500 rounded-sm">
          <Image
            src={art.src}
            alt={art.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-[#0B1F3A]/0 group-hover:bg-[#0B1F3A]/5 transition-colors duration-500" />
        </div>
        
        <div className="space-y-1">
          <h4 className="font-playfair text-xl text-[#0B1F3A] transition-colors group-hover:text-[#3A6EA5]">
            {art.title}
          </h4>
          <p className="text-[#0B1F3A]/60 font-light text-sm">{art.desc}</p>
          <p className="text-[#0B1F3A]/40 text-xs tracking-wider uppercase pt-1">{art.size}</p>
        </div>
      </Link>
    </motion.div>
  );
}
