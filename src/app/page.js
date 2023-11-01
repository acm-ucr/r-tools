"use client"
import {useState} from "react";
import Equations from "@/components/math/Equations";
const Home = () => {

  const test = ["x|y","x&y&z","x'|y'","x|y'","x&(y'|z)"]
  const [equations, setEquations] = useState(test);
  return (
  
  <>
  
  
  <Equations equations={equations} setEquations={setEquations}/>
  
  
  </>);
};

export default Home;
