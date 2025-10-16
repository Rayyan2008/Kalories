import Image from "next/image"

const screenshots = [
  {
    title: "Smart Food Notepad",
    description: "Simply type what you ate, and AI calculates calories instantly.",
    image: "/placeholder-screenshot-1.png", // Placeholder - replace with actual image
  },
  {
    title: "Calendar View",
    description: "Track your daily, weekly, and monthly food logs with ease.",
    image: "/placeholder-screenshot-2.png", // Placeholder - replace with actual image
  },
  {
    title: "Progress Dashboard",
    description: "Visual graphs showing your calorie intake trends and health goals.",
    image: "/placeholder-screenshot-3.png", // Placeholder - replace with actual image
  },
  {
    title: "AI Suggestions",
    description: "Get personalized meal recommendations and healthier alternatives.",
    image: "/placeholder-screenshot-4.png", // Placeholder - replace with actual image
  },
]

export default function Screenshots() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">See Kalorie AI in Action</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Experience the intuitive interface that makes calorie tracking effortless.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {screenshots.map((screenshot, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="aspect-video relative mb-4 bg-muted rounded-lg flex items-center justify-center">
              {index === 0 ? (
                <div className="text-muted-foreground text-center">
                  <div className="text-2xl mb-4">📝</div>
                  <div className="bg-white p-4 rounded-lg shadow-md text-black text-left max-w-sm">
                    <div className="flex">
                      <div className="flex-1">
                        <textarea
                          className="w-full h-20 border-none outline-none resize-none text-sm"
                          placeholder="Type what you ate..."
                          defaultValue="2 idlis + sambar"
                        />
                      </div>
                      <div className="ml-4 w-32">
                        <div className="bg-gray-100 p-2 rounded text-xs">
                          <div className="font-semibold">Calories: 320</div>
                          <div>Protein: 12g</div>
                          <div>Carbs: 45g</div>
                          <div>Fat: 8g</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs mt-2">Mockup: Typing "2 idlis + sambar"</p>
                </div>
              ) : (
                <div className="text-muted-foreground text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm">Screenshot Placeholder</p>
                </div>
              )}
            </div>
            <h3 className="font-bold text-xl mb-2">{screenshot.title}</h3>
            <p className="text-muted-foreground">{screenshot.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
