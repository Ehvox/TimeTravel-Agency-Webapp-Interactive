import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { DestinationsSection } from "@/components/destinations-section"
import { CustomizeSection } from "@/components/customize-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <DestinationsSection />
      <CustomizeSection />
      <ChatbotSection />
      <Footer />
    </main>
  )
}
