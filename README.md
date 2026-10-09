# Redline — Scroll-Driven Hero Experience

A production-grade, restrained, cinematic, scroll-driven hero experience. A top-view red sports car traverses an asphalt track as you scroll, choreographing dynamic typography dispersion, ignited metric cards, parallax speed-lines, and atmospheric underglow.

**Live Demonstration**: [https://Sanskrutiraka.github.io/redline-scroll-hero](https://Sanskrutiraka.github.io/redline-scroll-hero)
**Repository**: [https://github.com/Sanskrutiraka/redline-scroll-hero](https://github.com/Sanskrutiraka/redline-scroll-hero)

---

## 🏎️ Overview & Aesthetics

- **Concept**: A night drive on empty tarmac.
- **Palette**: One red object (`#E5322D` Redline), one road-paint-yellow detail (`#D9B44A` at 70% opacity), everything else warm neutral (`#0F0E0D` Tarmac, `#171513` Asphalt, `#ECE6DA` Bone, `#8A847A` Ash).
- **Atmosphere**: Subtle film grain overlay, radial vignette, matte editorial styling with hardware-accelerated transforms.

---

## 🛠️ Mandatory Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Motion Choreography**: [GSAP](https://gsap.com/) + ScrollTrigger + [`@gsap/react`](https://gsap.com/react) (`useGSAP` with scope ref)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) v1 synchronized to GSAP's internal ticker
- **Typography**: [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (*Unbounded* & *Instrument Sans*)
- **Deployment**: Next.js Static HTML Export (`output: 'export'`) deployed to GitHub Pages via GitHub Actions.

---

## 📂 Folder Structure

```
redline-scroll-hero/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated CI/CD GitHub Pages deployment
├── public/
│   └── car.png                   # Transparent top-view sports car asset
├── scripts/
│   └── setup-asset.js            # Build hook asset synchronizer
├── src/
│   ├── app/
│   │   ├── globals.css           # Design tokens, grain, vignette, fluid rules
│   │   ├── layout.tsx            # Google Fonts injection & metadata
│   │   └── page.tsx              # Main page orchestration
│   ├── components/
│   │   ├── Car.tsx               # Car container, flip, underglow, speed lines
│   │   ├── ClosingSection.tsx    # Natural ending section
│   │   ├── Headline.tsx          # Accessible per-character dispersion headline
│   │   ├── Hero.tsx              # Pinned 100svh hero orchestrator
│   │   ├── ProgressBar.tsx       # 2px right-edge scroll progress bar
│   │   ├── Road.tsx              # Tarmac surface, lane dashes, parallax grid
│   │   ├── StatCard.tsx          # Tabular count-up card & redline border
│   │   └── Stats.tsx             # Responsive 4-column / 2x2 grid container
│   ├── config/
│   │   └── heroConfig.ts         # Centralized motion constants & tunables
│   ├── data/
│   │   └── stats.ts              # Key performance metrics data
│   ├── hooks/
│   │   ├── useHeroIntro.ts       # 2.2s initial load entrance timeline
│   │   ├── useHeroScroll.ts      # Responsive ScrollTrigger scrub timeline
│   │   └── useLenis.ts           # Lenis instance and GSAP ticker sync
│   └── lib/
│       └── gsap.ts               # GSAP & ScrollTrigger registration singleton
├── next.config.mjs               # Static export & basePath configuration
├── tailwind.config.ts            # Custom design tokens mapping
├── tsconfig.json
└── README.md
```

---

## 🎬 Motion Design Decisions

### 1. Why `scrub: 1`?
A 1-second scrub lag (`scrub: 1`) smooths out the physics of mouse wheels, trackpads, and momentum flicks. It decouples the raw hardware input from the visual render, giving the sports car weight, inertia, and a cinematic feel rather than an abrupt mechanical lock.

### 2. Why Transform-Only Animations?
To achieve a steady 60–120 FPS without layout thrashing, every scroll-driven property is strictly transform (`x`, `y`, `scale`, `rotation`) and `opacity`. The browser composites these layers directly on the GPU without recalculating geometry (Reflow/Layout) or repainting bitmaps.

### 3. Lenis & GSAP Ticker Synchronization
Rather than running Lenis and GSAP on separate `requestAnimationFrame` loops (which can cause micro-stutter due to out-of-phase frames), Lenis is set to `autoRaf: false` and pumped manually inside GSAP's ticker:
```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
This guarantees frame-perfect lockstep between smooth inertia scrolling and ScrollTrigger calculations.

### 4. Per-Letter `x` Offsets vs. `letter-spacing`
Animating the CSS `letter-spacing` property forces the browser's layout engine to recalculate the inline text flow on every frame. Instead, each character is isolated in its own inline-block span, and displaced radially outwards using GPU transforms:
$$\Delta x = (\text{index} - \text{centerIndex}) \times \text{spreadPx}$$

### 5. Accessibility & Reduced Motion
For users with `prefers-reduced-motion: reduce`:
- Lenis smooth inertia and ScrollTrigger pinning are completely disabled.
- Parallax layers and car translations are bypassed.
- Metric values render at their final target values immediately with full borders visible.
- Screen readers receive clear semantic `aria-label="Welcome Itzfizz"` while letter spans are hidden via `aria-hidden="true"`.

---

## ⚙️ Motion Tuning in `heroConfig.ts`

To adjust the animation feel, edit `src/config/heroConfig.ts`:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `pin.desktop` | `+=300%` | Desktop scroll track length |
| `pin.mobile` | `+=200%` | Mobile scroll track length |
| `scrub` | `1` | Inertia smoothing lag in seconds |
| `scroll.car.endMarginVw` | `6` | Safety margin between car nose and right edge |
| `scroll.car.steeringRotationPeakDeg` | `-1.5` | Subtle car yaw rotation while cruising |
| `scroll.headline.spreadPxDesktop` | `14` | Max horizontal dispersion per letter |
| `scroll.stats.startBaseProgress` | `0.20` | Scroll progress where the 1st stat begins counting |
| `scroll.stats.intervalProgress` | `0.18` | Stagger progress interval between consecutive stats |
| `lenis.lerp` | `0.08` | Smooth scroll easing factor |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.x or 20.x
- npm / pnpm / yarn

### Installation & Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build and test static export**:
   ```bash
   npm run build
   ```
   Static files are exported to the `./out` directory.

4. **Preview the production build**:
   ```bash
   npx serve out
   ```

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub under the repo name `redline-scroll-hero`.
2. In GitHub, navigate to **Settings** &rarr; **Pages**.
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build the static export with `basePath: '/redline-scroll-hero'` and deploy it to `https://<username>.github.io/redline-scroll-hero`.
