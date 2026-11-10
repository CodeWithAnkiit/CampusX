import Navbar from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/SiteFooter';
import AmbientBackground from '@/components/layout/AmbientBackground';
import HeroSection from '@/components/landing/HeroSection';
import WhySection from '@/components/landing/WhySection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import DiscoverSection from '@/components/landing/DiscoverSection';
import FindYourPeopleSection from '@/components/landing/FindYourPeopleSection';
import SafetySection from '@/components/landing/SafetySection';
import FaqSection from '@/components/landing/FaqSection';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <AmbientBackground />
      <Navbar />
      <main>
        <HeroSection />
        <WhySection />
        <HowItWorksSection />
        <DiscoverSection />
        <FindYourPeopleSection />
        <SafetySection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
