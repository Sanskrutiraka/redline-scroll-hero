import Hero from '@/components/Hero';
import ClosingSection from '@/components/ClosingSection';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-bg text-text">
      <Hero />
      <ClosingSection />
    </main>
  );
}
