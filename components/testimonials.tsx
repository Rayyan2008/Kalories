import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content: "Kalorie AI has transformed how I track my meals. The notepad-style logging is so intuitive, and the AI suggestions are spot-on!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Busy Professional",
    content: "Finally, a calorie tracker that doesn't feel like a chore. Just type what I ate, and it handles the rest. My progress has never been better.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Nutrition Coach",
    content: "I recommend Kalorie AI to all my clients. The AI trainer feature provides personalized guidance that's truly helpful.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">What Our Users Say</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Join thousands of satisfied users who have transformed their health journey with Kalorie AI.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
