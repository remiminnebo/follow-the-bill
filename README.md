# Follow The Bill

A strategic investment non-profit organization website focused on tracking **AI** and **Robotics** ecosystem investments from top-level companies down to fundamental resources like uranium mining and power generation.

## 🎯 Dual Ecosystem Approach

**Follow The Bill** tracks two interconnected investment theses:

### AI Ecosystem
- AI & Cloud providers → Semiconductors → Data Centers → Energy → Resources

### Robotics Ecosystem  
- Humanoid & Industrial Robotics → Motion Control → Sensors → AI & Autonomy → Semiconductors (shared) → Energy (shared) → Resources (shared)

### Global Coverage
- 🇺🇸 **US**: NVIDIA, Tesla, Microsoft, Google, Intuitive Surgical
- 🇯🇵 **Japan**: Fanuc, Yaskawa, Keyence, Hitachi
- 🇨🇳 **China**: Baidu, XPeng
- 🇪🇺 **Europe**: ABB, ASML, Siemens

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
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
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/         # Protected user dashboard
│   ├── strategy/            # AI Strategy page
│   │   └── robotics/        # Robotics Strategy page
│   ├── performance/         # AI Performance page
│   │   └── robotics/        # Robotics Performance page
│   ├── reports/             # Reports archive
│   ├── forum/               # Community forum
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage (dual ecosystem)
│   └── globals.css          # Global styles & design tokens
├── components/
│   ├── layout/              # Header, Footer
│   ├── home/                # Homepage components (InvestmentFlow, RoboticsInvestmentFlow)
│   ├── strategy/            # EcosystemSelector, PerformanceChart, RoboticsPerformanceChart
│   ├── reports/             # Report cards
│   ├── forum/               # Forum components
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── db.ts                # Prisma client
│   ├── tickers.ts           # AI ETF tickers
│   ├── robotics-tickers.ts  # Robotics ETF tickers (with Japan & China stocks)
│   ├── market-data.ts       # Yahoo Finance integration
│   ├── utils.ts             # Utility functions
│   └── validations.ts       # Zod schemas
├── prisma/
│   └── schema.prisma        # Database schema
└── public/
    ├── logo.svg             # Brand logo
    └── reports/             # PDF reports
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
| `/` | Homepage with dual ecosystem overview and investment flows |
| `/strategy` | AI Ecosystem strategy explanation |
| `/strategy/robotics` | Robotics Ecosystem strategy explanation |
| `/performance` | AI ETF performance tracking |
| `/performance/robotics` | Robotics ETF performance tracking |
| `/reports` | Archive of monthly investment reports |
| `/forum` | Community discussion forum |
| `/sign-in` | User sign-in page |
| `/sign-up` | User registration page |

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Authentication and profiles
- **Subscription**: Free/Premium tier management
- **Report**: Monthly investment reports
- **Post**: Forum threads
- **Comment**: Forum replies
- **Vote**: Upvote/downvote system
- **MarketCache**: Cached stock data from Yahoo Finance

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

**Follow The Bill** - Track AI and Robotics ecosystem investments from global tech leaders to fundamental resources.
