import AboutSection from "../components/homepage/About";
import FaqGrid from "../components/homepage/FaqGrid";
import FeaturesGrid from "../components/homepage/FeaturesGrid";
import HomeCover from "../components/homepage/HomeCover";
import HomeCoverContent from "../components/homepage/HomeCoverContent";
import ScrollToButton from "../components/homepage/ScrollToButton";
import Section from "../components/homepage/Section";
import ServicesGrid from "../components/homepage/ServicesGrid";
import TeamGrid from "../components/homepage/TeamGrid";
import TestimonialsGrid from "../components/homepage/TestimonialsGrid";
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
        <Section title="Serviciile noastre" sectionId="services">
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
        <ScrollToButton sectionId="header" />
      </main>
      <Footer />
    </>
  );
};

export default Home;
