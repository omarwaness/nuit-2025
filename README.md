# N.I.R.D Quest - Digital Resistance Platform

<div align="center">

![NIRD Logo](https://img.shields.io/badge/NIRD-Quest-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

**Mission: Free schools from web giants**

[Features](#-features) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**N.I.R.D Quest** (Numérique Inclusif Responsable et Durable) is an educational platform designed to empower schools and families to reclaim their digital independence. The project promotes:

- **Inclusion**: Free open-source software and refurbished computers accessible to everyone
- **Responsibility**: Data sovereignty with GDPR compliance, full control by schools
- **Sustainability**: Fighting planned obsolescence, reducing e-waste by 30kg per PC

This platform was developed for **La Nuit de l'Info 2025**, a 24-hour hackathon focused on creating innovative digital solutions.

### Key Statistics

- 🏫 **19 NIRD Schools** actively using the platform
- 💰 **80,000€** saved per school per year
- 🌱 **30kg** of waste avoided per refurbished PC
- 🔒 **100%** data stored in France (GDPR compliant)

---

## ✨ Features

### 🎮 Interactive Game
- Educational globe-based game teaching digital independence
- Gamified learning experience
- Real-time progress tracking

### 📚 Quest System
- **10+ Interactive Quizzes** covering:
  - Free Software Fundamentals
  - Linux Migration
  - Cloud Alternatives
  - LibreOffice Mastery
  - Digital Security
  - Computer Recycling
  - Open Source Philosophy
  - Data Sovereignty
- Progress tracking and XP rewards
- Difficulty levels: Easy, Medium, Hard

### 🔄 Alternatives Comparison
- Side-by-side comparison of proprietary vs. open-source tools
- Real-time data from Supabase
- Detailed feature analysis

### 📖 Mission & Education
- Comprehensive mission statement
- Three pillars: Sustainability, Sovereignty, Education
- Educational resources and guides

### 🔐 Authentication
- Secure user authentication via Supabase
- Role-based access control
- Password recovery system

### 🎨 Modern UI/UX
- Responsive design (mobile-first)
- Smooth animations with Framer Motion
- Glassmorphism effects
- Dark/light theme support
- Accessible components

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Supabase account** (free tier works)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nuit-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Set up the database schema (see Database Setup below)

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

The project uses Supabase for data storage. You'll need to create the following tables:

#### Alternatives Table
```sql
CREATE TABLE alternatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  proprietary_name TEXT NOT NULL,
  description TEXT,
  features JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

For more detailed database setup, refer to the Supabase documentation or contact the development team.

---

## 📁 Project Structure

```
nuit-2025/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page with game
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── mission/             # Mission page
│   ├── quest/               # Quiz/Quest page
│   ├── alternatives/        # Alternatives comparison page
│   ├── auth/                # Authentication pages
│   │   ├── login/
│   │   ├── sign-up/
│   │   └── ...
│   └── report/              # Project report page
│
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── Navbar.tsx           # Navigation component
│   ├── ComparisonCard.tsx   # Alternative comparison card
│   └── ...
│
├── lib/                     # Utility libraries
│   ├── supabase/            # Supabase client setup
│   │   ├── client.ts        # Client-side Supabase
│   │   ├── server.ts        # Server-side Supabase
│   │   └── proxy.ts         # Proxy configuration
│   └── utils.ts             # General utilities
│
├── queries/                 # Data fetching functions
│   ├── alternatives.ts
│   └── getAlternatives.ts
│
├── types/                   # TypeScript type definitions
│   └── alternatives.ts
│
├── public/                  # Static assets
│   ├── game/                # Game assets
│   └── ...
│
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

---

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Vercel Deployment
VERCEL_URL=your_vercel_url
```

**Important**: Never commit `.env.local` to version control. It's already included in `.gitignore`.

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful component and variable names
- Add comments for complex logic
- Follow React best practices

### Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript interfaces for props

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically detect Next.js and configure the build settings.

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**
- **Self-hosted** (Node.js server)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Write clear commit messages
- Test your changes thoroughly
- Update documentation if needed
- Follow the existing code style
- Be respectful and constructive in discussions

---

## 📊 Project Statistics

- **Total Quizzes**: 10
- **Total Questions**: 40+
- **Components**: 20+
- **Pages**: 8+
- **Lines of Code**: 5000+

---

## 🎓 Educational Resources

This project serves as both a platform and an educational resource:

- **Free Software Philosophy**: Learn about the four freedoms
- **Linux Migration**: Guides for transitioning from Windows
- **Privacy & Security**: Understanding data sovereignty
- **Sustainability**: Environmental impact of technology choices

---

## 📝 License

This project is developed for **La Nuit de l'Info 2025**. 

For licensing information, please contact the project maintainers.

---

## 🙏 Acknowledgments

- **La Nuit de l'Info** - For organizing the hackathon
- **Supabase** - For providing an excellent backend platform
- **Next.js Team** - For the amazing framework
- **Open Source Community** - For inspiration and tools

---

## 📞 Contact & Support

- **Project Repository**: [GitHub Link]
- **Issues**: [GitHub Issues]
- **Documentation**: See `/app/report` for detailed project report

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐!

---

<div align="center">

**Made with ❤️ for La Nuit de l'Info 2025**

*Empowering schools to reclaim their digital independence*

</div>

