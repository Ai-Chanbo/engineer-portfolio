import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { Portfolio } from "@/components/sections/Portfolio";
import { Articles } from "@/components/sections/Articles";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <Profile />
        <Portfolio />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
