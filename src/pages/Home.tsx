import AboutSection from "../components/home/About";
import FaqGrid from "../components/home/FaqGrid";
import FeaturesGrid from "../components/home/FeaturesGrid";
import HomeCover from "../components/home/HomeCover";
import HomeCoverContent from "../components/home/HomeCoverContent";
import Section from "../components/home/Section";
import ServicesGrid from "../components/home/ServicesGrid";
import TeamGrid from "../components/home/TeamGrid";
import TestimonialsGrid from "../components/home/TestimonialsGrid";
import Footer from "../components/partials/Footer";
import NavBar from "../components/partials/NavBar";

const Home = () => {
  return (
    <>
      <HomeCover>
        <NavBar />
        <HomeCoverContent />
      </HomeCover>
      <main>
        <AboutSection />
        <Section title="Serviciile noastre" sectionId="service">
          <ServicesGrid />
        </Section>
        <TeamGrid />
        <Section title="De ce să lucrezi cu noi?" sectionId="features">
          <FeaturesGrid />
        </Section>
        <Section
          title="Feedback de la clienții noștri"
          sectionId="testimonials"
        >
          <TestimonialsGrid />
        </Section>
        <Section title="Întrebări frecvente" sectionId="faq">
          <FaqGrid />
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
