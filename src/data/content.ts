export type ShapeKind = 'circle' | 'wave' | 'triangle' | 'grid' | 'sun' | 'spark';
export type ProjectSpan = 'tall' | 'half' | 'wide';
export type GalleryGroup = 'Power Apps' | 'Power Automate' | 'Power BI' | 'SharePoint';

export interface GalleryItem {
  src: string;
  caption?: string;
  group: GalleryGroup;
}

export interface Project {
  id: string;
  num: string;
  title: string;
  tag: string;
  year: string;
  role: string;
  timeline: string;
  swatch: string;
  lede: string;
  body: string;
  stack: string[];
  span: ProjectSpan;
  shape: ShapeKind;
  link: string;
  href?: string;
  gallery?: GalleryItem[];
}

export interface SkillGroup {
  title: string;
  swatch: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  color: string;
}

function range(prefix: string, count: number, ext: 'png' | 'jpg', group: GalleryGroup): GalleryItem[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/showcase/${prefix}-${String(i + 1).padStart(2, '0')}.${ext}`,
    group,
  }));
}

const POWER_PLATFORM_GALLERY: GalleryItem[] = [
  ...range('power-apps', 16, 'png', 'Power Apps'),
  ...range('power-automate', 2, 'jpg', 'Power Automate'),
  ...range('power-bi', 3, 'png', 'Power BI'),
  ...range('sharepoint', 4, 'png', 'SharePoint'),
];

export const PROJECTS: Project[] = [
  {
    id: 'movn',
    num: '01',
    title: 'Movn Platform',
    tag: 'Monorepo · Web · CRM · API',
    year: '2025',
    role: 'Lead Developer',
    timeline: 'Ongoing',
    swatch: 'var(--purple)',
    lede: 'A three-app monorepo powering lead intake, quoting, move operations, and customer payments for a moving company.',
    body: 'Movn ties together a public marketing site, an internal CRM for leads, quotes, users, assignments, and payment review, and a single Express/TypeScript API that owns all PostgreSQL access. Built as a pnpm + Turborepo workspace with shared types, Stripe for deposits and final payments, Google OAuth for CRM login, and Gmail SMTP for outbound mail. Docker Compose gets the whole stack running locally in one command.',
    stack: ['Vue 3', 'Vite', 'TypeScript', 'Express', 'PostgreSQL', 'Stripe', 'Turborepo', 'Docker'],
    span: 'tall',
    shape: 'circle',
    link: 'movnbids.com',
    href: 'https://movnbids.com/',
  },
  {
    id: 'shoptr',
    num: '02',
    title: 'ShopTR',
    tag: 'Mobile · Inventory',
    year: '2025',
    role: 'Developer',
    timeline: '3 months',
    swatch: 'var(--green)',
    lede: 'A multi-tenant inventory app with role-based access, immutable stock logs, and low-stock alerts.',
    body: 'Cross-platform Flutter app on the front, Express + TypeScript on the back, PostgreSQL underneath. Multi-tenant company isolation, JWT auth, three permission roles (Admin / Manager / Employee), and immutable inventory logs so movement history is never edited in place. CRUD for products, categories, and suppliers.',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Express', 'TypeScript', 'PostgreSQL', 'JWT'],
    span: 'half',
    shape: 'grid',
    link: 'github.com/Hale17OT/ShopTR',
    href: 'https://github.com/Hale17OT/ShopTR',
  },
  {
    id: 'checklist-app',
    num: '03',
    title: 'Safety Checklist',
    tag: 'Mobile · Aviation',
    year: '2024',
    role: 'Developer',
    timeline: 'Lived on Play Store · 8 months',
    swatch: 'var(--maroon)',
    lede: 'A Flutter checklist app built for Ethiopian Airlines — live on the Play Store for eight months before the company took it down.',
    body: 'Cross-platform Flutter client backed by the EtGround .NET API. Designed for ground crews running through pre-flight and operational checklists, with offline tolerance and Firebase integration for sign-in and reporting. Shipped to the Play Store and used by airline staff for eight months before being pulled internally by the company.',
    stack: ['Flutter', 'Dart', 'Firebase', 'EtGround API'],
    span: 'half',
    shape: 'triangle',
    link: 'github.com/Hale17OT/checklist_app',
    href: 'https://github.com/Hale17OT/checklist_app',
  },
  {
    id: 'power-platform',
    num: '04',
    title: 'Power Platform Portfolio',
    tag: 'Power Apps · Automate · BI · SharePoint',
    year: '2024–2026',
    role: 'Developer & Designer',
    timeline: 'Client work across multiple engagements',
    swatch: 'var(--yellow)',
    lede: 'Production Power Apps, automation flows, BI dashboards, and SharePoint structures — built end-to-end for enterprise clients.',
    body: 'A cross-section of low-code work I have shipped to real clients across Vision Vertex Solutions and independent consulting: canvas Power Apps with bespoke UI, Power Automate flows that wire systems together, Power BI dashboards that turn raw operational data into something a leader can act on, and SharePoint structures sized for actual usage. Open the modal to scroll through screenshots from each.',
    stack: ['Power Apps', 'Power Automate', 'Power BI', 'SharePoint', 'Power FX', 'Dataverse'],
    span: 'wide',
    shape: 'sun',
    link: 'Client work',
    gallery: POWER_PLATFORM_GALLERY,
  },
  {
    id: 'etground',
    num: '05',
    title: 'EtGround API',
    tag: 'Backend · .NET 7',
    year: '2024',
    role: 'Contributor',
    timeline: 'Ethiopian Airlines engagement',
    swatch: 'var(--red)',
    lede: 'A .NET 7 Web API for Ethiopian Airlines ground operations — CQRS, DDD, EF Core for writes, Dapper for reads.',
    body: 'Layered Web API with a clean separation between API, Application (CQRS + MediatR), Domain (DDD entities), and Infrastructure (EF Core for command-side writes, Dapper for query-side reads against SQL Server). Authorization, logging, and exception filters wrap the request pipeline. The same API powers the Safety Checklist mobile app used by ground crews.',
    stack: ['.NET 7', 'C#', 'EF Core', 'Dapper', 'MediatR', 'SQL Server', 'DDD · CQRS'],
    span: 'half',
    shape: 'wave',
    link: 'Private · Ethiopian Airlines',
  },
  {
    id: 'eaglepoint',
    num: '06',
    title: 'Eaglepoint AI',
    tag: 'AI · Polyglot Engineering',
    year: '2026',
    role: 'Mid Level Software Consultant',
    timeline: 'Ongoing',
    swatch: 'var(--purple)',
    lede: 'Building, testing, and shipping reproducible polyglot software for AI model capability evaluation.',
    body: 'Each task targets a different stack so the engineering work spans most of the modern web. Recent weeks alone include Rust services on Axum with Diesel and PostgreSQL, Angular 19 SPAs with Jest and Playwright, Vue 3 + Vite + Tailwind frontends, .NET solutions for backend services, plus Java, PHP / Laravel, TypeScript / Node, and Python where the task calls for them — all Dockerized end to end. Every deliverable lands with a self-test report, validation artifacts, and a README so any reviewer can reproduce the run from a cold checkout.',
    stack: ['Rust · Axum', 'Angular', 'Vue 3', '.NET · C#', 'TypeScript · Node', 'Java', 'PHP · Laravel', 'Python', 'PostgreSQL · Diesel', 'Docker'],
    span: 'half',
    shape: 'spark',
    link: 'Private · AI evaluation work',
  },
];

export const SKILLS: SkillGroup[] = [
  {
    title: 'Engineering',
    swatch: 'var(--green)',
    items: ['C# · .NET 7+', 'TypeScript · Vue · Node', 'Flutter · Dart', 'Python · SQL', 'Docker · DevOps'],
  },
  {
    title: 'Power Platform',
    swatch: 'var(--yellow)',
    items: ['Power Apps · Canvas & Model', 'Power Automate Flows', 'Power BI Dashboards', 'Dataverse Modeling', 'Copilot Studio Agents'],
  },
  {
    title: 'Delivery',
    swatch: 'var(--red)',
    items: ['Requirements Gathering', 'UI / UX Design', 'API & Integration Design', 'Documentation & READMEs', 'Client Presentations'],
  },
];

export const SOCIALS: SocialLink[] = [
  { label: 'github / Hale17OT', href: 'https://github.com/Hale17OT', color: 'var(--green)' },
  { label: 'twitter / @hale17ot', href: 'https://x.com/hale17ot', color: 'var(--red)' },
  { label: 'instagram / hale17ot', href: 'https://www.instagram.com/hale17ot/', color: 'var(--purple)' },
  { label: 'email / haleabdissa17', href: 'mailto:haleabdissa17@gmail.com', color: 'var(--yellow)' },
];

export const HERO = {
  name: 'HALLELUJAH ABDISSA',
  role: 'Independent developer & consultant',
  location: 'Addis Ababa, Ethiopia',
  statement:
    'I build software both ways — custom full-stack code in .NET, TypeScript, and Flutter, and low-code solutions on the Microsoft Power Platform. Working independently from Addis Ababa, taking on engagements across enterprise tooling, mobile apps, and AI work.',
  available: true,
  email: 'haleabdissa17@gmail.com',
  cvHref: '/Hallelujah-Abdissa-CV.pdf',
} as const;

export const MARQUEE_TOP = ['CODE', 'POWER APPS', 'AUTOMATE', '.NET', 'FLUTTER', 'POWER BI'];
export const MARQUEE_BOTTOM = ['SELECTED · WORK', '2022 — 2026', 'ADDIS ABABA', 'TAKE A LOOK'];
