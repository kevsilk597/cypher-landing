import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Sameness from "../components/Sameness";
import SignalSection from "../components/SignalSection";
import ConvergenceFunnel from "../components/ConvergenceFunnel";
import Delivery from "../components/Delivery";
import Emotion from "../components/Emotion";
import Audience from "../components/Audience";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Sameness />
      <SignalSection />
      <ConvergenceFunnel />
      <Delivery />
      <Emotion />
      <Audience />
      <FinalCTA />
    </main>
  );
}
