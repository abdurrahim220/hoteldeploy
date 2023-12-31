
import Footer from "../components/Footer/Footer";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import { Outlet } from 'react-router-dom';



const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
     <div className="container mx-auto py-10 flex-1">
      <Outlet/>
     </div>
      <Footer />
    </div>
  );
};

export default Layout;
