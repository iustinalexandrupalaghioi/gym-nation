import Features from "../components/Features";
import HomeHeader from "../components/Header";
import NavBar from "../components/NavBar";
import CoverText from "../components/CoverText";
import About from "../components/About";
import Services from "../components/Services";

const Home = () => {
  return (
    <>
      <HomeHeader>
        <NavBar />
        <CoverText />
      </HomeHeader>
      <About />
      <Services />
      <Features />
    </>
  );
};

export default Home;
