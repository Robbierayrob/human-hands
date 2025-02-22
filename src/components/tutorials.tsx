import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TutorialsProps {
  id?: string
}

const tutorials = [
  {
    title: "Ikea Shelf",
    description: "Design and optimize your shelf structures",
    link: "/tutorials/ikea-shelf",
    placeholder: "📚 Shelf Design Tools"
  },
  {
    title: "Grundfoss",
    description: "Pump system analysis and optimization",
    link: "/tutorials/grundfoss",
    placeholder: "💧 Pump System Tools"
  }
]

export function Tutorials({ id }: TutorialsProps) {
  return (
    <section id={id} className="w-full py-12">
      <div className="container px-4 md:px-6 max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-6">
          Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative h-40 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-20" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                  {tutorial.placeholder}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <div className="flex-1" />
              <CardContent className="pb-6">
                <Button className="w-full" asChild>
                  <a href={tutorial.link}>Start Tutorial</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
