# Dental Clinic Website

A public, Arabic-first (RTL) website for a dental clinic with a free online booking flow. Built with **Next.js 14**, **TypeScript** and **Supabase**, and deployed as a static site on GitHub Pages.

**Live demo:** https://salmantawfeeq.github.io/dental-clinic-website/

## Features

- Home, services, about and contact pages
- Step-by-step online booking wizard backed by Supabase
- Clinic opening hours and info configured in one place (`src/lib/clinicInfo.ts`, `src/lib/clinicHours.ts`)
- Row Level Security policies for public access (`supabase/schema.sql`)
- Automated deployment with GitHub Actions

## Tech Stack

Next.js 14 (static export), React 18, TypeScript, Supabase (PostgreSQL + RLS), pnpm, GitHub Actions, GitHub Pages.

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # add your Supabase URL and anon key
pnpm dev                     # http://localhost:3000
pnpm typecheck
pnpm build
```

## Author

**Salman Tawfiq** - .NET / Full-Stack Developer, Riyadh, Saudi Arabia
[LinkedIn](https://www.linkedin.com/in/salmantawfiq) | [Portfolio](https://salmantawfiq.com)
