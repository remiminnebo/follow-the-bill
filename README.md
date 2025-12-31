# Follow The Bill

A strategic investment non-profit organization website focused on tracking AI ecosystem investments from top-level companies down to fundamental resources like uranium mining and power generation.

![Homepage Preview](/assets/screenshots/homepage.png)

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (prepared)
- **File Storage**: Vercel Blob (for PDF reports)
- **Language**: TypeScript

## 🎨 Design System

The website follows a **brutalist, minimalist aesthetic**:

- **Colors**: Pure black (`#000000`) and white (`#FFFFFF`) only
- **Typography**: 
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)
- **UI Principles**: 
  - Sharp corners (no rounded borders)
  - High contrast
  - Bold 2px borders
  - No shadows or gradients

## 📁 Project Structure

```
follow-the-bill/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   ├── signin/
│   │   └── signup/
│   ├── (dashboard)/      # Protected user dashboard
│   ├── strategy/         # Strategy explanation page
│   ├── reports/          # Reports archive
│   ├── forum/            # Community forum
│   ├── admin/            # Admin panel
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles & design tokens
├── components/
│   ├── layout/           # Header, Footer
│   ├── home/             # Homepage components
│   ├── reports/          # Report cards
│   ├── forum/            # Forum components
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── db.ts             # Prisma client
│   ├── utils.ts          # Utility functions
│   └── validations.ts    # Zod schemas
├── prisma/
│   └── schema.prisma     # Database schema
└── public/
    ├── logo.svg          # Brand logo
    └── reports/          # PDF reports
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- PostgreSQL database (or use Supabase/Neon)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/follow-the-bill.git
   cd follow-the-bill
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database URL and other secrets:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations** (when database is connected)
   ```bash
   npx prisma migrate dev
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📄 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, investment flow diagram, newsletter signup |
| `/strategy` | Detailed explanation of the "Follow The Bill" methodology |
| `/reports` | Archive of monthly investment reports |
| `/forum` | Community discussion forum |
| `/signin` | User sign-in page |
| `/signup` | User registration page |

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Authentication and profiles
- **Subscription**: Free/Premium tier management
- **Report**: Monthly investment reports
- **Post**: Forum threads
- **Comment**: Forum replies
- **Vote**: Upvote/downvote system

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio |
| `npx prisma migrate dev` | Run migrations |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📜 License

This project is licensed under the MIT License.

---

**Follow The Bill** - Track AI ecosystem investments from top-level companies down to fundamental resources.
