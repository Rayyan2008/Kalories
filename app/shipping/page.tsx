export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-20 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
          Shipping & Delivery Policy
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Digital Service</h2>
            <p className="text-muted-foreground mb-4">
              Kalorie.ai is a digital service providing AI-powered calorie tracking and meal analysis. As such, there are no physical products to ship.
            </p>
            <p className="text-muted-foreground mb-4">
              All services are delivered instantly upon successful payment and account activation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Service Activation</h2>
            <p className="text-muted-foreground mb-4">
              Premium features are activated immediately after successful payment processing through our secure payment gateway.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Account upgrade takes effect within minutes</li>
              <li>Confirmation email sent upon successful activation</li>
              <li>Full access to premium features available immediately</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Technical Requirements</h2>
            <p className="text-muted-foreground mb-4">
              To use our service, you need:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>A compatible web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>Stable internet connection</li>
              <li>JavaScript enabled</li>
              <li>Cookies enabled for optimal experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Service Availability</h2>
            <p className="text-muted-foreground mb-4">
              Our service is available 24/7, subject to occasional maintenance windows. We strive for 99.9% uptime.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. International Access</h2>
            <p className="text-muted-foreground mb-4">
              Our digital service is accessible worldwide, though some features may vary by region due to local regulations and data availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about service delivery or technical support, please contact us:
            </p>
            <div className="text-muted-foreground mb-4">
              <p><strong>Email:</strong> rayyanislam83@gmail.com</p>
              <p><strong>Phone:</strong> +91 8882612872</p>
              <p><strong>Address:</strong> JAMIA NAGAR, NEW DELHI 110025</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
