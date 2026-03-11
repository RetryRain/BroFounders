import CallingCard from "@/sections/Home/CallingCard";
import FAQ from "@/sections/Home/Faq";
import Featured from "@/sections/Home/Featured";
import Footer from "@/sections/Home/Footer";
import Hero from "@/sections/Home/Hero";
import Navbar from "@/sections/Home/Navbar";
import Workflow from "@/sections/Home/Workflow";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Workflow />
      <Featured />
      <FAQ />
      <CallingCard />
      <Footer />
    </>
  );
}
