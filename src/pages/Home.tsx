import FeaturesGrid from "../components/FeaturesGrid";
import HomeHeader from "../components/Header";
import NavBar from "../components/NavBar";
import CoverText from "../components/CoverText";
import About from "../components/About";
import ServicesGrid from "../components/ServicesGrid";

const Home = () => {
  return (
    <>
      <HomeHeader>
        <NavBar />
        <CoverText />
      </HomeHeader>
      <About />
      <ServicesGrid />
      <FeaturesGrid />
    </>
  );
};

export default Home;
