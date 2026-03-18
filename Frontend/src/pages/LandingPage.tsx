import { lazy, Suspense } from "react";
import Hero from "@/sections/Home/Hero";
import Navbar from "@/sections/Home/Navbar";
import { motion, type Easing } from "framer-motion";

/* Lazy load non-critical sections */
const Workflow = lazy(() => import("@/sections/Home/Workflow"));
const Featured = lazy(() => import("@/sections/Home/Featured"));
const FAQ = lazy(() => import("@/sections/Home/FAQ"));
const CallingCard = lazy(() => import("@/sections/Home/CallingCard"));
const Footer = lazy(() => import("@/sections/Home/Footer"));

/* Smooth easing */
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

      <main>
        {/* HERO (no lazy) */}
        <motion.div style={{ perspective: 1000 }}>
          <motion.div
            initial={{ opacity: 0, z: -200, scale: 0.9 }}
            animate={{ opacity: 1, z: 0, scale: 1 }}
            transition={{ duration: 1, ease: smoothEase }}
          >
            <Hero />
          </motion.div>
        </motion.div>

        {/* WORKFLOW */}
        <Suspense fallback={<div style={{ height: 200 }} />}>
          <motion.div {...fadeUp}>
            <Workflow />
          </motion.div>
        </Suspense>

        {/* FEATURED */}
        <Suspense fallback={<div style={{ height: 200 }} />}>
          <motion.div {...fadeLeft}>
            <Featured />
          </motion.div>
        </Suspense>

        {/* FAQ */}
        <Suspense fallback={<div style={{ height: 200 }} />}>
          <motion.div {...fadeRight}>
            <FAQ />
          </motion.div>
        </Suspense>

        {/* CTA */}
        <Suspense fallback={<div style={{ height: 200 }} />}>
          <motion.div {...zoomIn}>
            <CallingCard />
          </motion.div>
        </Suspense>

        {/* FOOTER */}
        <Suspense fallback={<div style={{ height: 100 }} />}>
          <motion.div {...fadeUp}>
            <Footer />
          </motion.div>
        </Suspense>
      </main>
    </>
  );
}
