# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four confirmed audiences, in rough priority of how the site must serve them:

1. **Co-op/internship recruiters** — screening quickly, often arriving from a resume link or LinkedIn; need fast proof of capability.
2. **Research PIs and grad admissions** — evaluating research depth, lab experience, and rigor.
3. **Startup/industry engineers** — assessing fit for software or hardware roles outside co-op pipelines.
4. **Peers and network** — classmates, hackathon teammates, and collaborators browsing the work.

## Product Purpose

Personal portfolio for Jeniton Augustinpillai, Nanotechnology Engineering student at the University of Waterloo and Research Intern at Harvard SEAS (Aizenberg Lab). The site exists to convert visits into direct outreach and profile follow-through. Success = a visitor emails Jeniton or continues to GitHub/LinkedIn. (Resume download and long project dwell time are supporting behaviors, not the primary goal — user confirmed.)

## Positioning

**Nanotech × software hybrid** — the claim a typical engineering-student portfolio couldn't truthfully copy: hands-on cleanroom/semiconductor fabrication (MOS capacitors, STM tip etching, wafer work) combined with real ML and full-stack software (wafer defect detection AI, vision systems, hackathon products). Research-grade depth (Harvard SEAS, STM tip fabrication lead) and builder velocity are supporting evidence for this claim, not competing positions.

## Operating Context

- Single-page portfolio: hero → quote intro → experience → projects → skills → footer contact.
- Live at https://jeniton.vercel.app/ (no custom domain yet), deployed on Vercel.
- Visitors typically arrive from a resume link, LinkedIn, or word of mouth and decide quickly.

## Capabilities and Constraints

- Stack: React 18 + TypeScript + Vite, Tailwind CSS, shadcn/ui (Radix), Framer Motion, GSAP, three.js effects. Bun/npm lockfiles both present.
- Static frontend only; no backend. Contact is `mailto:` — no form.
- Content is hard-coded in section components (`src/components/*.tsx`), not CMS-driven.

## Evidence on Hand

- **Experience (in `ExperienceSection.tsx`):** Research Intern, Harvard University, Jan 2026–present (bio-inspired gas sensors + AI, Aizenberg Lab); STM Tip Fabrication Lead, Formula Nano, May 2024–present; Greenhouse Juice Inc., Sep 2024–Apr 2025; EXO Insights Corp., Jan 2024–Apr 2024.
- **Projects (in `ProjectsSection.tsx`):** MOS Capacitor Microfabrication, Wafer Defect Detection AI, STM Tip Etching Process, Camera Vision System – Peroxide Detection, SigmaScholar (Hack The North 2025), TOYOTA Innovation Challenge, AntiZone survival shooter.
- **Assets:** profile photo, Harvard shield SVG, employer logos (Formula Nano, Greenhouse Juice, EXO Insights) in `src/assets/`, compressed to WebP.
- **Resume PDF** in repo root (`Jeniton_Augustinpillai_Engineering (12).pdf`).
- **Links:** mailto:j4august@uwaterloo.ca · https://github.com/JenitonA · https://linkedin.com/in/jenitona/
- No testimonials, publications list, or case-study metrics on hand — do not fabricate any.

## Product Principles

1. **Prove the hybrid, don't just say it.** Every surface should pair fabrication evidence with software evidence; the combination is the differentiator.
2. **Fast credibility for skimmers, depth for evaluators.** Recruiters must get the picture in seconds; PIs must find rigor when they dig.
3. **Drive outreach.** Email and GitHub/LinkedIn are the conversion actions; keep them reachable from anywhere on the page.
4. **Real evidence only.** Roles, dates, projects, and affiliations are factual claims — never embellish or invent metrics, publications, or endorsements.
