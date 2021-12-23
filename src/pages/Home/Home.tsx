import React, { useEffect } from "react";
import { startFCM } from "../../config/firebase";

export const Home: React.FunctionComponent = () => {
  
  useEffect(() => {
    startFCM()
  });

  return (
    <>
      <p>HOME</p>
    </>
  );
};

export default Home;
