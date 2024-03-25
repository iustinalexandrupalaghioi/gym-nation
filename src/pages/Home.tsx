import About from "../components/About";
import Features from "../components/Features";
import HomeHeader from "../components/Header";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <HomeHeader>
        <NavBar />
      </HomeHeader>
      <About />
      <Features />
    </>
  );
};

export default Home;
