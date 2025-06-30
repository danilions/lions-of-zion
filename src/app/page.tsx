import Hero from '@/components/Hero'
import WorldMapBg from '@/components/WorldMapBg'
import HeartbeatLine from '@/components/HeartbeatLine'
import Skyline from '@/components/Skyline'
import LionOverlay from '@/components/LionOverlay'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#091f3b] to-[#254875] overflow-hidden">
      {/* לוגו האריה מעל מפה */}
      <LionOverlay />
      {/* רקע מפה */}
      <WorldMapBg />

      {/* תוכן עליון - כותרת וסלאגן */}
      <section className="relative z-10 pt-16 text-center px-4 max-w-5xl mx-auto">
        <Hero />
      </section>

      {/* פדסטל */}
      <div className="relative z-10 mx-auto mt-10 w-[280px] h-[60px] rounded-xl bg-gradient-to-br from-[#002a58] to-yellow-400/50 border border-cyan-500/30 shadow-lg" />

      {/* heartbeat line */}
      <div className="relative z-10 mt-12 mx-auto w-[90vw] max-w-3xl h-[50px]">
        <HeartbeatLine />
      </div>

      {/* נוטיפיקציות חיות */}
      <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-20 flex gap-6">
        <div className="px-4 py-2 bg-cyan-600/20 border border-cyan-500 rounded-lg text-cyan-300 font-semibold shadow-md">
          79 users joined
        </div>
        <div className="px-4 py-2 bg-yellow-600/20 border border-yellow-500 rounded-lg text-yellow-400 font-semibold shadow-md">
          Disinformation cluster detected
        </div>
      </div>

      {/* Skyline ירושלים */}
      <div className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none">
        <Skyline />
      </div>
    </main>
  )
}
