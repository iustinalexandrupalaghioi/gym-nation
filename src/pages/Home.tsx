import FeaturesGrid from "../components/FeaturesGrid";
import NavBar from "../components/NavBar";
import About from "../components/About";
import ServicesGrid from "../components/ServicesGrid";
import HomeCover from "../components/HomeCover";
import TeamGrid from "../components/TeamGrid";
import HomeCoverText from "../components/HomeCoverText";
import FaqGrid from "../components/FaqGrid";
import TestimonialsGrid from "../components/TestimonialsGrid";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <HomeCover>
        <NavBar />
        <HomeCoverText />
      </HomeCover>
      <main>
        <About />
        <ServicesGrid />
        <TeamGrid />
        <FeaturesGrid />
        <TestimonialsGrid />
        <FaqGrid />
        <Footer />
      </main>
    </>
  );
};

export default Home;
