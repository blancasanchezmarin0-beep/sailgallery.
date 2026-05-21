"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { artworks } from "@/lib/data";

const items = artworks.filter(a => a.type === "lienzo");

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1F3A] pb-24">
      {/* HEADER */}
      <header className="w-full py-8 px-6 lg:px-12 flex items-center justify-between border-b border-gray-100">
        <Link href="/" className="inline-flex items-center text-[#0B1F3A]/70 hover:text-[#3A6EA5] transition-colors group">
          <ChevronLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium tracking-wider uppercase text-sm">Volver al inicio</span>
        </Link>
        <div className="font-playfair text-2xl font-bold tracking-wide">
          NAUT
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16">
        <div className="mb-20">
          <h1 className="font-playfair text-5xl lg:text-6xl text-[#0B1F3A] mb-6">Colección de Lienzos</h1>
          <div className="w-16 h-1 bg-[#3A6EA5]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {items.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <Link href={`/obra/${art.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6 group-hover:shadow-2xl transition-all duration-700 rounded-sm">
                  <Image
                    src={art.src}
                    alt={art.title}
                    fill
                    className={`object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05] ${art.status === "NO DISPONIBLE" ? "grayscale contrast-125" : ""}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#0B1F3A]/0 group-hover:bg-[#0B1F3A]/5 transition-colors duration-500" />
                  
                  {art.status === "NO DISPONIBLE" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#0B1F3A]/80 text-white px-4 py-2 text-xs tracking-[0.3em] font-bold uppercase backdrop-blur-sm">
                        Vendido
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-playfair text-2xl text-[#0B1F3A] transition-colors group-hover:text-[#3A6EA5]">
                    {art.title}
                  </h4>
                  <p className="text-[#0B1F3A]/60 font-light text-sm italic">{art.material}</p>
                  <p className="text-[#0B1F3A]/40 text-xs tracking-wider uppercase pt-1">{art.size} — {art.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
