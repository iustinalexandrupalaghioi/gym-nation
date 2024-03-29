import FeaturesGrid from "../components/FeaturesGrid";
import NavBar from "../components/NavBar";
import CoverText from "../components/CoverText";
import About from "../components/About";
import ServicesGrid from "../components/ServicesGrid";
import HomeCover from "../components/HomeCover";
import TeamGrid from "../components/TeamGrid";

const Home = () => {
  return (
    <main>
      <HomeCover>
        <NavBar />
        <CoverText />
      </HomeCover>
      <ServicesGrid />
      <About />
      <FeaturesGrid />
      <TeamGrid />
    </main>
  );
};

export default Home;
