import CallingCard from "@/sections/Home/CallingCard";
import FAQ from "@/sections/Home/FAQ";
import Featured from "@/sections/Home/Featured";
import Footer from "@/sections/Home/Footer";
import Hero from "@/sections/Home/Hero";
import Navbar from "@/sections/Home/Navbar";
import Workflow from "@/sections/Home/Workflow";
import { motion, type Easing } from "framer-motion";

/* Smooth easing (TS-safe) */
const smoothEase: Easing = [0.22, 1, 0.36, 1];

/* Animation variants */

const fadeUp = {
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: smoothEase },
  viewport: { once: true, margin: "-100px" },
};

const fadeLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: smoothEase },
  viewport: { once: true, margin: "-100px" },
};

const fadeRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: smoothEase },
  viewport: { once: true, margin: "-100px" },
};

const zoomIn = {
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: smoothEase },
  viewport: { once: true, margin: "-100px" },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* Hero - real depth */}
      <motion.div style={{ perspective: 1000 }}>
        <motion.div
          initial={{ opacity: 0, z: -200, scale: 0.9 }}
          animate={{ opacity: 1, z: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: smoothEase,
          }}
        >
          <Hero />
        </motion.div>
      </motion.div>

      {/* Workflow */}
      <motion.div {...fadeUp}>
        <Workflow />
      </motion.div>

      {/* Featured */}
      <motion.div {...fadeLeft}>
        <Featured />
      </motion.div>

      {/* FAQ */}
      <motion.div {...fadeRight}>
        <FAQ />
      </motion.div>

      {/* CTA */}
      <motion.div {...zoomIn}>
        <CallingCard />
      </motion.div>

      {/* Footer */}
      <motion.div {...fadeUp}>
        <Footer />
      </motion.div>
    </>
  );
}
