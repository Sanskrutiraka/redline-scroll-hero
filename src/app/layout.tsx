import type { Metadata } from 'next';
import { Unbounded, Instrument_Sans } from 'next/font/google';
import './globals.css';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-unbounded',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Redline — Scroll Driven Hero Experience',
  description:
    'A restrained, cinematic, scroll-driven hero experience engineered with GSAP ScrollTrigger and Lenis smooth scrolling.',
  keywords: ['GSAP', 'ScrollTrigger', 'Next.js', 'Lenis', 'Creative Frontend', 'Motion Design'],
  authors: [{ name: "Sanskruti Raka", url: "https://github.com/sanskrutiraka" }],
  creator: "Sanskruti Raka",
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#0F0E0D',
  openGraph: {
    title: 'Redline — Scroll Driven Hero Experience',
    description: 'A night drive on empty tarmac. Precision scroll choreography.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${unbounded.variable} ${instrumentSans.variable}`}>
      <body className="bg-bg text-text antialiased selection:bg-accent selection:text-text min-h-screen overflow-x-hidden">
        {/* Cinematic atmospheric overlays */}
        <div className="noise-overlay" aria-hidden="true" />
        <div className="vignette-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
