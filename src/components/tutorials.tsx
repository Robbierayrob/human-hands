import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export function Tutorials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  {tutorial.placeholder}
                </div>
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
