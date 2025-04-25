
# Medium-like Blogging Platform

A simple blogging website that allows users to create, update, and delete posts. Built with modern web technologies for optimal performance and developer experience.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Hono (Cloudflare Workers)
- **Styling**: Tailwind CSS
- **Database**: Prisma + Prisma Accelerate
- **Validation**: Zod (shared via `@okaymahimasingh/medium-common`)
- **Deployment**: Cloudflare Pages & Workers

## Features

- User authentication (if implemented)
- Create blog posts with rich text
- Edit existing posts
- Delete posts
- Responsive design
- Type-safe API with Zod validation

## Project Structure

```
.
├── frontend/            # React frontend
├── backend/            # Hono backend (Cloudflare Worker)
├── common/            # Shared Zod schemas (published as npm package)
├── prisma/            # Prisma schema and migrations
└── README.md
```

## Prerequisites

- Node.js (v18+)
- npm or pnpm
- Cloudflare account
- Prisma Accelerate setup

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahimasingh04/gemenSpak.git
   cd medium-clone
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install && cd ../backend && npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both `client` and `worker` directories
   - Add your Prisma connection string and other required variables

## Database Setup

1. Run Prisma migrations:
   ```bash
   cd worker
   npx prisma migrate dev
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

## Running Locally

### Frontend
```bash
cd client
npm run dev
```

### Backend (Worker)
```bash
cd worker
npm run dev
```

## Deployment

### Cloudflare Workers
1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Deploy the worker:
   ```bash
   cd worker
   wrangler deploy
   ```

### Cloudflare Pages (Frontend)
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`

## Shared Zod Schemas

The `@okaymahimasingh/medium-common` package contains shared Zod schemas for type safety between frontend and backend. Update the package when making changes to validation logic.

## API Endpoints

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a single post
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

MIT
```

### Additional Notes:

1. You might want to add:
   - Screenshots of your application
   - More detailed API documentation
   - Authentication flow details if implemented
   - Any special deployment considerations

2. For the shared package (`@okaymahimasingh/medium-common`), you might want to include instructions on how to update and publish new versions.

3. Consider adding a "Troubleshooting" section for common setup issues.

Would you like me to add any specific sections or provide more details on any part of this README?
 
