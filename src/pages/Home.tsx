import About from "../components/About";
import Features from "../components/Features";
import HomeHeader from "../components/Header";
import HomeWelcome from "../components/HomeWelcome";
import NavBar from "../components/NavBar";
import { about } from "../data/about";

const Home = () => {
  return (
    <>
      <HomeHeader>
        <NavBar />
        <HomeWelcome />
      </HomeHeader>
      <About text={about} />
      <Features />
    </>
  );
};

export default Home;
