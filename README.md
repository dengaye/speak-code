# Speak Code

A web application that helps non-native English speakers learn and practice frontend development terminology through audio pronunciation. This tool is specifically designed for developers who want to improve their understanding and pronunciation of common frontend technical terms.

## Features

- Collection of commonly used frontend development terms and vocabulary
- Audio pronunciation for each technical term
- Modern and responsive UI built with React 19 and TailwindCSS
- Server-side rendering with Next.js 15
- TypeScript support for better development experience

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/speak-code.git
cd speak-code
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
speak-code/
├── app/                    # Next.js app directory
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── models/           # Data models
│   ├── presenters/       # Presentation logic
│   ├── services/         # Business logic and API services
│   └── types/           # TypeScript type definitions
├── public/               # Static files
└── lib/                 # Shared utilities and helpers
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Hero Icons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint