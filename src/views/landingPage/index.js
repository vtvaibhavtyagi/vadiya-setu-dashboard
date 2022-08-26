import "./App.css";
import Download from "./Download";
import Experience from "./Experience";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Search from "./Search";

const App = () => {
  return (
    <div className="App text-white overflow-hidden text-[#06283D] ">
      <Header />
      <Hero/>
        <Experience/>
        <Search/>
        <Download/>
        <Footer/>
    </div>
  );
};

export default App;
