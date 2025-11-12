import bg from './assets/pexels-pixabay-47367.jpg';
import fbg from './assets/land.png';
import coin from './assets/source.gif';
import './App.css'
import{Parallax, ParallaxLayer } from '@react-spring/parallax';
import { motion } from "motion/react";
import React, { useRef, useEffect } from 'react';


function App() {
  const countPage = useRef(null);
  const myPage = useRef(null);
  const coinsPage = useRef(null);
  
  const scrollToSection = () => {
    if (targetSectionRef.current){
      targetSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return(
    <div>
      <Parallax pages={4}>
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
          }}
         />

        <ParallaxLayer onScroll={scrollToSection} offset={0} speed={0.05} ref={countPage} >
          <h2 class="unselectable">Count</h2>
        </ParallaxLayer>

        <ParallaxLayer onScroll={scrollToSection} offset={1.4} speed={0.2} factor={1} ref={myPage}>
          <h2 class="unselectable">My</h2>
          
        </ParallaxLayer>

        <ParallaxLayer
            offset={2}
            speed={1}
            factor={3.5}
            style={{
              
              backgroundImage: `url(${fbg})`,
              backgroundSize: "cover",
              backgroundPosition: "center"

            }}
        />

        <ParallaxLayer onScroll={scrollToSection} offset={2.4} speed={0.05} ref={coinsPage}>
          <h2 class="unselectable">Coins</h2>
        </ParallaxLayer>

        <ParallaxLayer sticky={{start:1, end:1.4}} speed={0.05}>
          <img class="coin" src={coin} height="95%" width="100%"></img>
        </ParallaxLayer>

        <ParallaxLayer offset={3.5} speed={0.1}>
            <ImportAnimate/>
        </ParallaxLayer>
        
      </Parallax>
    </div>
  )
}

function ImportAnimate(){
  return(
    <div class="coinContainer">

    </div>
  )
}


export default App
