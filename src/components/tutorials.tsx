import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TutorialsProps {
  id?: string
  className?: string
}

const tutorials = [
  {
    title: "Grundfoss",
    description: "Pump system analysis and optimization",
    link: "/tutorials/grundfoss",
    placeholder: "💧 Pump System Tools"
  },
  {
    title: "Ikea Shelf",
    description: "Design and optimize your shelf structures",
    link: "/tutorials/ikea-shelf",
    placeholder: "📚 IKEA Shelf "
  }
]

export function Tutorials({ id, className }: TutorialsProps) {
  return (
    <section id={id} className={`w-full py-12 ${className}`}>
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="mb-8 pl-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Can we fix it? Yes we can!
          </h1>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Explore Our Tutorials
          </h2>
          <p className="mt-3 text-lg text-white/80 max-w-2xl">
            Hands-on guides to help you master engineering concepts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-8">
          {tutorials.map((tutorial, index) => (
            <a 
              key={index} 
              href={tutorial.link} 
              className={`group relative h-64 rounded-lg overflow-hidden ${tutorial.title === "Ikea Shelf" ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-transform'}`}
              onClick={tutorial.title === "Ikea Shelf" ? (e) => e.preventDefault() : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-6xl text-center">
                {tutorial.placeholder}
              </div>
              {tutorial.title === "Ikea Shelf" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-white text-xl font-bold">Coming Soon</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
