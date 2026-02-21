import Image from "next/image";

import LandingPage from "./components/LandingPage";
import Map from "./components/Map";
import PowerfullFeatures from "./components/PowerfullFeatures";
import WhoBenefit from "./components/WhoBenefit";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div className="   ">
  <LandingPage/>
  <Map/>
<PowerfullFeatures/>
  <WhoBenefit/>
 <Footer/>
    </div>
  );
}
