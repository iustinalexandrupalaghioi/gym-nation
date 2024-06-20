import { useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import ToastAlert from "../../components/ToastAlert";
import AboutSection from "../../components/homepage/About";
import ContactGrid from "../../components/homepage/Contact/ContactGrid";
import FaqGrid from "../../components/homepage/Faq/FaqGrid";
import FeaturesGrid from "../../components/homepage/Features/FeaturesGrid";
import HomeCover from "../../components/homepage/HomeCover/HomeCover";
import HomeCoverContent from "../../components/homepage/HomeCover/HomeCoverContent";
import PricingSection from "../../components/homepage/Preturi/PricingSection";
import ScrollToButton from "../../components/homepage/ScrollToButton";
import Section from "../../components/homepage/Section";
import ServicesGrid from "../../components/homepage/ServicesSection/ServicesGrid";
import TeamGrid from "../../components/homepage/Team/TeamGrid";
import TestimonialsGrid from "../../components/homepage/Testimonial/TestimonialsGrid";
import Footer from "../../components/partials/Footer/Footer";
import NavBar from "../../components/partials/Navbar/NavBar";
import { auth } from "../../firebase-config";
import useUserStatusStore from "../../stores/userStore";
import getUserRole from "../../utilities/getUserRole";
import getUserStatus from "../../utilities/getUserStatus";

const HomePage = () => {
  const setStatus = useUserStatusStore((s) => s.setStatus);
  const setRole = useUserStatusStore((s) => s.setRole);

  // Function to fetch user status and role
  const fetchUserStatusAndRole = async (user: User | null) => {
    if (user) {
      const newUserStatus = await getUserStatus();
      setStatus(newUserStatus);

      const newUserRole = await getUserRole(user.uid);
      setRole(newUserRole);
    }
  };

  // Check authentication state and fetch user status and role on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserStatusAndRole(user);
      }
    });

    // Fetch user status and role on component mount
    fetchUserStatusAndRole(auth.currentUser);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <ToastAlert />
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
        <Section
          title="Alege varianta potrivită pentru tine"
          sectionId="pricing"
        >
          <PricingSection />
        </Section>
        <Section title="De ce să ne alegi pe noi?" sectionId="features">
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
        <ContactGrid />
        <ScrollToButton sectionId="header" />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
