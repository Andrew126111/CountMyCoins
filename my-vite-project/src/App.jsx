import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import bg from './assets/pexels-pixabay-47367.jpg';
import fbg from './assets/land.png';
import './App.css'
import{Parallax, ParallaxLayer } from '@react-spring/parallax';
import { motion } from "motion/react";


function App() {
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

        <ParallaxLayer offset={0} speed={0.05}>
          <h2>Count</h2>
        </ParallaxLayer>

        <ParallaxLayer offset={1.4} speed={0.3} factor={1}>
          <h2>My</h2>
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
        <ParallaxLayer offset={2.4} speed={0.05}>
          <h2>Coins</h2>
        </ParallaxLayer>


        <ParallaxLayer offset={3.5} speed={0.1}>
          <motion.ul animate={{ rotate: 360 }} />
        </ParallaxLayer>

      </Parallax>
    </div>
  )
}

export default App
