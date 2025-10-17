export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-20 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
          Cancellation & Refund Policy
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Subscription Cancellation</h2>
            <p className="text-muted-foreground mb-4">
              You may cancel your subscription at any time through your account settings or by contacting our support team.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Cancellations take effect at the end of the current billing period</li>
              <li>You will continue to have access to premium features until the cancellation takes effect</li>
              <li>No cancellation fees apply</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Refund Eligibility</h2>
            <p className="text-muted-foreground mb-4">
              We offer refunds under the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Within 7 days of initial subscription purchase</li>
              <li>Technical issues preventing service usage (verified by our team)</li>
              <li>Duplicate charges or billing errors</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Refund Process</h2>
            <p className="text-muted-foreground mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground mb-4">
              <li>Contact our support team at support@kalorie.ai</li>
              <li>Provide your account email and reason for refund</li>
              <li>Include any relevant transaction details</li>
              <li>Our team will review your request within 2-3 business days</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Refund Timeline</h2>
            <p className="text-muted-foreground mb-4">
              Approved refunds are processed within 5-7 business days and will appear in your original payment method.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Non-Refundable Items</h2>
            <p className="text-muted-foreground mb-4">
              The following are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Partial month subscriptions</li>
              <li>Services used beyond the refund period</li>
              <li>Refunds requested after 30 days from purchase</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Subscription Changes</h2>
            <p className="text-muted-foreground mb-4">
              You may upgrade or downgrade your subscription at any time. Changes take effect immediately, and billing is prorated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For refund requests or cancellation assistance, please contact us:
            </p>
            <ul className="text-muted-foreground mb-4">
              <li>Email: rayyanislam83@gmail.com</li>
              <li>Phone: +91 8882612872</li>
              <li>Response time: Within 24 hours</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
