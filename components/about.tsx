export default function About() {
  return (
    <section id="about" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">About Kalorie AI</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          The platform also includes:
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Our Vision</h3>
            <p className="text-muted-foreground">
              To empower everyone with intelligent tools that make healthy living effortless and enjoyable.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Our Technology</h3>
            <p className="text-muted-foreground">
              Advanced AI and machine learning algorithms that understand your food intake and provide personalized insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
