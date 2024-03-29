import FeaturesGrid from "../components/FeaturesGrid";
import NavBar from "../components/NavBar";
import About from "../components/About";
import ServicesGrid from "../components/ServicesGrid";
import HomeCover from "../components/HomeCover";
import TeamGrid from "../components/TeamGrid";
import HomeCoverText from "../components/HomeCoverText";

const Home = () => {
  return (
    <>
      <HomeCover>
        <NavBar />
        <HomeCoverText />
      </HomeCover>
      <main>
        <ServicesGrid />
        <About />
        <FeaturesGrid />
        <TeamGrid />
      </main>
    </>
  );
};

export default Home;
