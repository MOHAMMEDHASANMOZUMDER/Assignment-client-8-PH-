# StudioSpace

Live site URL: `http://localhost:3000` (local development; deploy the client to Vercel for the submitted live URL).

- Discover and filter creative studios by category, name, or location.
- Book workspace time with authenticated, protected routes.
- Hosts can publish, edit, and delete their own studio listings.
- Google OAuth and email/password authentication use Better Auth and HTTP-only sessions.
- Built with Next.js App Router, TypeScript, React Hot Toast, Express, and MongoDB.
- Local setup: start the API with `npm start`, then run `cd client && npm run dev`.
- Examiner test credentials: no shared secret is committed; register a test account at `/register` using any valid email and a password containing uppercase, lowercase, and six or more characters.
- Theme customization: use the moon/sun button in the navbar to switch the complete interface between light and dark themes.
- Booking workflow: open any studio detail page and use “Book workspace now” to launch the custom booking modal.
- Image uploads: copy `.env.example` to `.env.local` and add an ImgBB API key for the device upload option.
- Deployment: import this `client` folder into Vercel and set `API_URL` to the deployed server URL.
- Vercel environment template: copy `.env.vercel.example` values into Vercel Project Settings; do not commit real secrets.
