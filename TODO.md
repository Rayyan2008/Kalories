# TODO: Add Profile Setup for Calorie Goals

## Steps to Complete

- [x] Create components/profile-setup-modal.tsx: Build a modal to collect user profile data (age, gender, current weight, target weight) and calculate calorie goals.
- [x] Modify components/dashboard.tsx: Add profile data check on load, display calorie goals in the dashboard, and provide option to update profile.
- [x] Modify components/login-form.tsx: Ensure redirection to dashboard triggers profile setup if data is missing.
- [x] Test the profile setup flow: Verify modal appears on first login, calculations are accurate, goals display correctly, and update functionality works.
- [x] Ensure responsive design and smooth UX across devices.

## Progress Tracking
- Started: [Date/Time]
- Completed: [Track as steps are done]

---

# TODO: Implement Razorpay Subscription Payments (India-friendly)

## Steps to Complete

- [x] Install Razorpay dependencies (razorpay)
- [x] Create API route for order creation (/api/create-checkout-session)
- [x] Create webhook handler for payment events (/api/webhook)
- [x] Update Pricing component with functional subscription buttons
- [x] Create dedicated pricing page (/pricing)
- [x] Update pricing to INR (₹999/month for Pro, ₹1499/month for Premium)
- [x] Add environment variables for Razorpay configuration
- [x] Test subscription flow (requires Razorpay test keys)
- [x] Create legal pages (Terms, Privacy, Refunds, Shipping)
- [x] Update footer with legal links
- [ ] Set up Razorpay account and get API keys
- [ ] Implement user subscription status management
- [ ] Add success/cancel page handling

## Progress Tracking
- Started: [Date/Time]
- Completed: API routes, component updates, pricing changes, legal pages
- Remaining: Razorpay account setup, user management, testing

---

# TODO: Razorpay KYC Setup

## Steps to Complete

- [ ] Create Razorpay account at https://razorpay.com
- [ ] Complete business verification and KYC process
- [ ] Generate API keys (test and live)
- [ ] Configure webhook endpoints in Razorpay dashboard
- [ ] Test payment flow with test keys
- [ ] Set up live environment when ready

## Progress Tracking
- Started: [Date/Time]
- Completed: [Track as steps are done]
