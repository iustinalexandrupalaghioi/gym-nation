import AboutSection from "../components/homepage/About";
import ContactGrid from "../components/homepage/Contact/ContactGrid";
import FaqGrid from "../components/homepage/Faq/FaqGrid";
import FeaturesGrid from "../components/homepage/Features/FeaturesGrid";
import HomeCover from "../components/homepage/HomeCover/HomeCover";
import HomeCoverContent from "../components/homepage/HomeCover/HomeCoverContent";
import ScrollToButton from "../components/homepage/ScrollToButton";
import Section from "../components/homepage/Section";
import ServicesGrid from "../components/homepage/ServicesSection/ServicesGrid";
import TeamGrid from "../components/homepage/Team/TeamGrid";
import TestimonialsGrid from "../components/homepage/Testimonial/TestimonialsGrid";
import Footer from "../components/partials/Footer/Footer";
import NavBar from "../components/partials/Navbar/NavBar";

const HomePage = () => {
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
        <Section title="Contactează-ne" sectionId="contact">
          <ContactGrid />
        </Section>
        <ScrollToButton sectionId="header" />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
