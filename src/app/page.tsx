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

// Force per-request rendering: Railway's private network to Postgres is only
// reachable at runtime, not during `next build`. Static prerendering would bake
// in whatever the DB-reading components fell back to during that build (see
// their try/catch) and keep serving it until an admin action calls
// revalidatePath("/") — which never happens for rows inserted outside the
// admin panel (e.g. via prisma/seed.ts), so the homepage can go stale forever.
export const dynamic = "force-dynamic";

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
