import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SchoolSymbols from "@/components/SchoolSymbols";
import Stats from "@/components/Stats";
import EducationalOffer from "@/components/EducationalOffer";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import News from "@/components/News";
import Admissions from "@/components/Admissions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <AboutSection />
        <SchoolSymbols />
        <Stats />
        <EducationalOffer />
        <WhyChooseUs />
        <Gallery />
        <News />
        <Admissions />
        <Contact />
      </main>
      <Footer />
      <WhatsappFloatingButton />
    </>
  );
}
