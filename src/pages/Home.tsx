import About from "../components/home/About";
import FaqGrid from "../components/home/FaqGrid";
import FeaturesGrid from "../components/home/FeaturesGrid";
import HomeCover from "../components/home/HomeCover";
import HomeCoverContent from "../components/home/HomeCoverContent";
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
        <About />
        <ServicesGrid />
        <TeamGrid />
        <FeaturesGrid />
        <TestimonialsGrid />
        <FaqGrid />
      </main>
      <Footer />
    </>
  );
};

export default Home;
