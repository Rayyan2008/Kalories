# TODO: Fix Authentication Redirect and Session Management

## Current Issue
- Social authentication (Google, GitHub, Facebook) works, but after login, user is redirected to /dashboard without being "remembered" by the site.
- Navbar and dashboard components check localStorage for "kalorie-auth", but NextAuth session isn't being used properly.
- User appears logged out immediately after social login.

## Tasks
- [x] Update navbar.tsx to use NextAuth session instead of localStorage
- [x] Update dashboard-home.tsx to use NextAuth session instead of localStorage
- [ ] Test social login flow to ensure user details are accessible
- [x] Update logout functionality to use NextAuth signOut
- [ ] Verify user details (name, email, image) are stored and accessible from session

## Files to Edit
- components/navbar.tsx
- components/dashboard-home.tsx
