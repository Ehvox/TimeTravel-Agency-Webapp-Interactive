"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { useInView } from "@/hooks/use-animations"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Bienvenue chez TimeTravel Agency ! Je suis Chronos, votre agent de voyage temporel. Comment puis-je vous aider ? Souhaitez-vous en savoir plus sur nos destinations ou planifier votre prochain voyage dans le temps ?",
  },
]

const suggestedQuestions = [
  "Quelle destination me recommandez-vous ?",
  "Est-ce dangereux de voyager au Cretace ?",
  "Que puis-je voir a Paris en 1889 ?",
  "Comment fonctionne le voyage temporel ?",
]

function getResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes("paris") || msg.includes("1889") || msg.includes("eiffel")) {
    return "Paris 1889 est un choix merveilleux ! Vous assisterez a l'Exposition Universelle, l'un des evenements les plus spectaculaires de l'histoire. La Tour Eiffel vient d'etre inauguree et illumine le ciel parisien. Je recommande notre forfait 5 jours qui inclut un diner au sommet de la Tour et une visite guidee des pavilions de l'Exposition. Voulez-vous que je vous prepare un devis personnalise ?"
  }

  if (msg.includes("cretace") || msg.includes("dinosaure") || msg.includes("dangereux")) {
    return "Le Cretace est notre destination la plus aventureuse ! Rassurez-vous, votre securite est notre priorite absolue. Vous voyagerez dans une bulle de protection chrono-energetique certifiee niveau 5. Vous pourrez observer des T-Rex, des Brachiosaures et bien d'autres especes a une distance securisee. La temperature est tropicale (environ 32 degres C), prevoyez des vetements legers !"
  }

  if (msg.includes("florence") || msg.includes("1504") || msg.includes("renaissance") || msg.includes("vinci")) {
    return "Florence 1504 est notre destination la plus culturelle ! Vous pourrez visiter l'atelier de Leonard de Vinci et le voir travailler sur ses inventions. Michel-Ange termine son David cette annee-la. Le Palais des Medicis vous ouvrira ses portes pour un banquet Renaissance. C'est l'epoque ou l'art et la science se rencontrent !"
  }

  if (msg.includes("recommand") || msg.includes("conseil") || msg.includes("quelle destination")) {
    return "Cela depend de vos envies ! Pour une experience culturelle raffinee, je recommande Florence 1504 avec ses artistes de genie. Pour l'aventure extreme, le Cretace vous emerveillera. Pour un equilibre parfait entre culture et spectacle, Paris 1889 est ideal. Quel type d'experience vous attire le plus ?"
  }

  if (msg.includes("prix") || msg.includes("cout") || msg.includes("combien") || msg.includes("tarif")) {
    return "Nos tarifs commencent a 12 500 \u20ac pour Paris 1889, 15 800 \u20ac pour Florence 1504, et 28 000 \u20ac pour le Cretace (securite renforcee incluse). Ces prix sont par personne pour un sejour de 5 jours. Nous proposons des reductions pour les groupes et un paiement en 3 fois sans frais. Souhaitez-vous un devis detaille ?"
  }

  if (msg.includes("fonctionne") || msg.includes("comment") || msg.includes("technologie")) {
    return "Notre technologie de voyage temporel repose sur le Flux Chrono-Quantique brevetee. En simplifiant : nous creons une bulle spatio-temporelle qui vous transporte a l'epoque choisie. Le processus est totalement indolore et prend environ 3 secondes. Vous recevrez un bracelet chrono-localisateur pour garantir votre retour en toute securite. Nos portails sont certifies par l'Agence Internationale du Temps."
  }

  return "Excellente question ! Je serai ravi de vous renseigner davantage. Nos trois destinations — Paris 1889, le Cretace et Florence 1504 — offrent chacune une experience unique. N'hesitez pas a me poser des questions specifiques sur une destination, les tarifs, ou la securite de nos voyages temporels."
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>()
  const [chatRef, chatInView] = useInView<HTMLDivElement>()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text?: string) => {
    const message = text || input.trim()
    if (!message) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(message)
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <section id="chatbot" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Left description */}
          <div
            ref={sectionRef}
            className={`lg:col-span-2 transition-all duration-1000 ${
              sectionInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-primary">
              Assistant Chronos
            </span>
            <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
              <span className="text-balance">Votre guide temporel personnel</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Chronos est votre agent conversationnel specialise dans le voyage
              temporel. Posez-lui vos questions sur les destinations, la
              securite, les tarifs ou demandez des recommandations
              personnalisees.
            </p>
            <div className="mt-8 space-y-4">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="group/q flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left text-sm text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground hover:translate-x-2 hover:shadow-lg hover:shadow-primary/5"
                  style={{
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover/q:rotate-12 group-hover/q:scale-110" />
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div
            ref={chatRef}
            className={`lg:col-span-3 transition-all duration-1000 ${
              chatInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/5">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-border bg-secondary/30 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 transition-all duration-300 hover:bg-primary/30 hover:scale-110">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Chronos</p>
                  <p className="text-xs text-muted-foreground">
                    Agent de voyage temporel
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">En ligne</span>
                </div>
              </div>

              {/* Messages */}
              <div className="scrollbar-hide h-[450px] overflow-y-auto p-6">
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                      style={{
                        animation: index === messages.length - 1
                          ? `${msg.role === "user" ? "slide-in-right" : "slide-in-left"} 0.4s ease-out`
                          : undefined,
                      }}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${
                          msg.role === "assistant"
                            ? "bg-primary/20"
                            : "bg-secondary"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <Bot className="h-4 w-4 text-primary" />
                        ) : (
                          <User className="h-4 w-4 text-foreground" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 transition-all duration-300 hover:shadow-md ${
                          msg.role === "assistant"
                            ? "bg-secondary text-foreground hover:shadow-secondary/50"
                            : "bg-primary text-primary-foreground hover:shadow-primary/20"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3" style={{ animation: "slide-in-left 0.3s ease-out" }}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="rounded-2xl bg-secondary px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-border p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question..."
                    className="flex-1 rounded-full border border-border bg-input px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary focus:outline-none focus:shadow-lg focus:shadow-primary/10"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                    aria-label="Envoyer le message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
