//These are all the imports we need in our program, they will include photos, libraries etc that we can use  by refering to
//the name of the import

import bg from './assets/pexels-pixabay-47367.jpg';
import fbg from './assets/land.png';
import coin from './assets/source.gif';
import './App.css'
import{Parallax, ParallaxLayer } from '@react-spring/parallax';
import { motion } from "motion/react";
import React, { useRef, useEffect } from 'react';

//We always gotta create functions in react
function App() {
  const ref = useRef();
  return(
    <div>
      <Parallax pages={4} ref={ref}>
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
          }}
         />
        <Parallax>
        </Parallax>

        <ParallaxLayer onClick={()=> ref.current.scrollTo(1.4)} offset={0} speed={0.05} >
          <h2 class="unselectable">Count</h2>
        </ParallaxLayer>

        <ParallaxLayer offset={1.4} speed={0.2} factor={1}>
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

        <ParallaxLayer onClick={()=> ref.current.scrollTo(3.5)} offset={2.4} speed={0.05}>
          <h2 class="unselectable">Coins</h2>
        </ParallaxLayer>

        <ParallaxLayer sticky={{start:1, end:1.4}} speed={0.05} onClick={()=> ref.current.scrollTo(2.4)}>
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
    <div class="Container">
      <motion.div 
        class="coinContainer"
        style={{
          height:150,
          width:150,
        }}
        intial={{
          rotate: '0deg',
        }}
        animate={{
          rotate: '180deg'
        }}
        transition={{

        }}
    >
      </motion.div>
    </div>
  )
}


export default App
