export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-20 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
          Terms and Conditions
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using Kalorie.ai, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily use Kalorie.ai for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Service Description</h2>
            <p className="text-muted-foreground mb-4">
              Kalorie.ai provides AI-powered calorie tracking and meal analysis services. We reserve the right to modify or discontinue services at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Subscription Services</h2>
            <p className="text-muted-foreground mb-4">
              Subscription fees are billed in advance on a recurring basis. You agree to pay all charges associated with your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Refund Policy</h2>
            <p className="text-muted-foreground mb-4">
              Refunds are provided within 7 days of purchase for unused services. Please refer to our refund policy for detailed terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              Kalorie.ai shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms and Conditions, please contact us at support@kalorie.ai
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
