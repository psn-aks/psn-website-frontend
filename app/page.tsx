"use client"


import Hero from "@/components/sections/Hero"
import Features from "@/components/sections/Features"
import Contact from "@/components/sections/Contact"
import ChairmanSpeech from "@/components/sections/ChairmanSpeech";
import TrendingNews from "@/components/sections/TrendingNews";
import RunningAdvertsCarousel from "@/components/sections/RunningAdvertsCarousel";


export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-800">
      
      <Hero />
      <ChairmanSpeech />
      <Features />
      <TrendingNews />
      <RunningAdvertsCarousel />
      <Contact />
      
    </main>
  )
}
