
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

// import Features from './components/Features';
// import HowItWorks from './components/HowItWorks';
// import Showcase from './components/Showcase';
// import Testimonials from './components/Testimonials';
// import Pricing from './components/Pricing';
// import CTA from './components/CTA';
// import Footer from './components/Footer';


export default function Home() {
  return (
    <div className="font-sans antialiased text-stone-900 bg-[#FFFEF9]">
      <Navbar />
      <Hero />
      {/* <Features />
      <HowItWorks />
      <Showcase />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer /> */}
    </div>
  );
}
