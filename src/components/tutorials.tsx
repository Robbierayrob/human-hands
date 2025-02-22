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
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Explore Our Tutorials
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hands-on guides to help you master engineering concepts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative h-40 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-20" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl text-center">
                  {tutorial.placeholder}
                </div>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                <CardDescription className="mx-auto">{tutorial.description}</CardDescription>
              </CardHeader>
              <div className="flex-1" />
              <CardContent className="pb-4 text-center">
                <Button className="w-full max-w-[200px] mx-auto bg-orange-500 hover:bg-orange-600" asChild>
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
