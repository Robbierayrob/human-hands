import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-fade-in [animation-delay:0.1s]">
              Welcome to the Engineering Assistant
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 animate-fade-in [animation-delay:0.3s]">
              Visually learn with our tutorial assistant
            </p>
          </div>
          <div className="space-x-4 animate-fade-in [animation-delay:0.5s]">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white" 
              onClick={() => document.getElementById('tutorials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
