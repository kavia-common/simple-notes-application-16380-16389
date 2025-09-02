# Simple Notes Frontend (Next.js)

Minimalistic light-themed notes UI with:
- User authentication (email/password)
- View, create, edit, delete notes
- Search notes
- Top navbar, left notes list, right detail/edit view
- Floating action button for quick create

## Requirements

Create an `.env.local` file based on `.env.example` and set:
- `NEXT_PUBLIC_API_BASE_URL` — base URL of the backend REST API
- `NEXT_PUBLIC_SITE_URL` — the site origin, used for auth redirect if backend requires it

Example:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The frontend talks to the following backend endpoints (assumed to exist):
- POST /auth/register { email, password, emailRedirectTo? }
- POST /auth/login { email, password } -> { accessToken, refreshToken? }
- GET /notes?q=...
- GET /notes/:id
- POST /notes
- PUT /notes/:id
- DELETE /notes/:id

Tokens are stored in localStorage and sent as Authorization: Bearer <accessToken>.

## Development

Install deps and run:
```
npm install
npm run dev
```

Open http://localhost:3000

## Build and Start
```
npm run build
npm start
```

## Notes

- All API URLs are read from environment variables; do not hardcode them.
- The UI uses plain CSS classes plus Tailwind base for resets and utilities.
- If your backend uses different endpoints or payloads, adjust `src/lib/api.ts` accordingly.
