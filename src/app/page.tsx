import { Hero } from "@/components/hero"
import { Tutorials } from "@/components/tutorials"

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <Hero />
        <Tutorials id="tutorials" />
      </main>
    </div>
  );
}
