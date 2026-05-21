"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks } from "@/lib/data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function ObraPage({ params }: { params: any }) {
  const resolvedParams = React.use(params as any) as { id: string };
  const art = artworks.find((a) => a.id === resolvedParams.id);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!art) {
    notFound();
  }

  const recommendations = artworks.filter(a => a.id !== art.id).slice(0, 3);
  const subject = encodeURIComponent(`Consulta cuadro ${art.title}`);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openIndex !== null && art.gallery) {
      setOpenIndex((openIndex - 1 + art.gallery.length) % art.gallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openIndex !== null && art.gallery) {
      setOpenIndex((openIndex + 1) % art.gallery.length);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#0B1F3A] selection:bg-[#3A6EA5] selection:text-white pb-24">
      {/* HEADER MINIMALISTA */}
      <header className="w-full py-6 px-6 lg:px-12 flex items-center justify-between border-b border-gray-100 bg-white">
        <Link href="/" className="inline-flex items-center text-[#0B1F3A]/70 hover:text-[#3A6EA5] transition-colors group">
          <ChevronLeft className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest uppercase text-[10px]">Galería</span>
        </Link>
        <div className="font-playfair text-2xl font-bold tracking-widest">
          NAUT
        </div>
        <div className="w-20 hidden md:block" />
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16">
        {/* SECCIÓN PRINCIPAL */}
        <section className="flex flex-col lg:flex-row gap-16 lg:gap-24 fade-in">
          
          {/* Left Column: Main Image + Galería Secundaria */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">
            <div className="w-full h-[60vh] lg:h-[80vh] relative group overflow-hidden bg-gray-50 rounded-sm shadow-sm">
              <Image
                src={art.src}
                alt={art.title}
                fill
                className="object-contain object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* GALERÍA SECUNDARIA */}
            {art.gallery && art.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {art.gallery.map((imgSrc, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setOpenIndex(idx)}
                    className="relative aspect-[4/3] bg-gray-50 cursor-pointer overflow-hidden group rounded-sm shadow-sm"
                  >
                    <Image
                      src={imgSrc}
                      alt={`Detalle ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]/0 group-hover:bg-[#0B1F3A]/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 tracking-widest uppercase text-[10px] font-bold drop-shadow-md transition-opacity">
                        Ver
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="w-full lg:w-2/5 flex flex-col justify-start fade-in pt-4" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#3A6EA5] uppercase">
                pieza única
              </p>
              {art.status === "NO DISPONIBLE" && (
                <span className="bg-[#B91C1C] text-white text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm shadow-sm">
                  Vendido
                </span>
              )}
            </div>
            <h1 className="font-playfair text-4xl lg:text-6xl text-[#0B1F3A] mb-8 leading-tight italic">
              {art.title}
            </h1>
            
            <p className="text-[#0B1F3A]/80 text-lg font-light leading-relaxed mb-8">
              {art.longDesc}
            </p>
            
            <div className="w-16 h-px bg-[#0B1F3A]/20 mb-8"></div>
            
            <div className="space-y-5 mb-12">
              <p className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#0B1F3A]/50 font-bold">
                <span>Material</span>
                <span className="text-[#0B1F3A] font-medium">{art.material}</span>
              </p>
              <p className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#0B1F3A]/50 font-bold">
                <span>Formato</span>
                <span className="text-[#0B1F3A] font-medium">{art.size}</span>
              </p>
              <p className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#0B1F3A]/50 font-bold">
                <span>Estado</span>
                <span className={`${art.status === "DISPONIBLE" ? "text-green-600" : "text-red-700"} font-bold`}>
                  {art.status}
                </span>
              </p>
            </div>

            <div className="flex flex-col items-start gap-8">
              <span className="text-3xl font-bold text-[#0B1F3A]">{art.price}</span>
              <Button
                asChild={art.status === "DISPONIBLE"}
                disabled={art.status === "NO DISPONIBLE"}
                size="lg"
                className={`w-full sm:w-auto ${art.status === "DISPONIBLE" ? "bg-[#0B1F3A] hover:bg-[#3A6EA5]" : "bg-gray-200 text-gray-400 cursor-not-allowed"} text-white rounded-none px-16 py-8 text-[11px] font-bold tracking-[0.2em] uppercase shadow-xl transition-all active:scale-95`}
              >
                {art.status === "DISPONIBLE" ? (
                  <a href={`mailto:blancasanchemzarin0@gmail.com?subject=${subject}`}>
                    Comprar / Consultar
                  </a>
                ) : (
                  <span>No disponible</span>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* LIGHTBOX DIALOG */}
        <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
          <DialogContent className="max-w-none w-screen h-screen bg-[#0B1F3A]/95 border-0 p-0 shadow-none rounded-none flex items-center justify-center">
            <DialogTitle className="sr-only">Ampliación de imagen</DialogTitle>
            
            <button 
              onClick={() => setOpenIndex(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {art.gallery && art.gallery.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all z-50 p-4 active:scale-75"
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all z-50 p-4 active:scale-75"
                >
                  <ChevronRight className="w-12 h-12" />
                </button>
              </>
            )}

            <div className="relative w-full h-[85vh] px-4 md:px-24">
              {openIndex !== null && art.gallery && (
                <Image
                  src={art.gallery[openIndex]}
                  alt="Ampliación"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>

            {art.gallery && (
              <div className="absolute bottom-10 text-white/50 text-[10px] uppercase font-bold tracking-widest">
                {openIndex !== null ? openIndex + 1 : 0} / {art.gallery.length}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* RECOMENDACIONES DE CUADROS */}
        <section className="mt-32 border-t border-gray-100 pt-24 fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="font-playfair text-3xl text-[#0B1F3A] mb-16 text-center lg:text-left italic">
            Recomendaciones de cuadros
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {recommendations.map(rec => (
              <Link key={rec.id} href={`/obra/${rec.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-8 group-hover:shadow-2xl transition-all duration-700 rounded-sm">
                  <Image
                    src={rec.src}
                    alt={rec.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3A]/0 group-hover:bg-[#0B1F3A]/10 transition-colors duration-500" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-playfair text-2xl text-[#0B1F3A] transition-colors group-hover:text-[#3A6EA5] italic">
                    {rec.title}
                  </h4>
                  <div className="flex justify-between items-end">
                    <p className="text-[#0B1F3A]/60 font-light text-sm line-clamp-1">{rec.desc}</p>
                    <p className="text-[#0B1F3A] font-bold text-sm ml-4">{rec.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
