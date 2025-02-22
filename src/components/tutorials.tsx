import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tutorials = [
  {
    title: "Getting Started",
    description: "Learn the basics of using the Engineering Assistant",
    link: "/tutorials/getting-started"
  },
  {
    title: "Advanced Features",
    description: "Explore the powerful tools for complex engineering tasks",
    link: "/tutorials/advanced-features"
  },
  {
    title: "Best Practices",
    description: "Discover industry-standard approaches to engineering problems",
    link: "/tutorials/best-practices"
  }
]

export function Tutorials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </CardHeader>
              <CardContent>
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
