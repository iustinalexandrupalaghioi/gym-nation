import About from "../components/About";
import Features from "../components/Features";
import HomeHeader from "../components/Header";
import NavBar from "../components/NavBar";
import { about } from "../data/about";

const Home = () => {
  return (
    <>
      <HomeHeader>
        <NavBar />
      </HomeHeader>
      <About text={about} />
      <Features />
    </>
  );
};

export default Home;
