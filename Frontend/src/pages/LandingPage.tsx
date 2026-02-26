import CallingCard from "@/sections/CallingCard";
import Featured from "@/sections/Featured";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Navbar from "@/sections/Navbar";
import Workflow from "@/sections/Workflow";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Workflow />
      <Featured />
      <CallingCard />
      <Footer />
    </>
  );
}
