//These are all the imports we need in our program, they will include photos, libraries etc that we can use  by refering to
//the name of the import

import bg from './assets/pexels-pixabay-47367.jpg';
import fbg from './assets/land.png';
import coin from './assets/source.gif';
import './App.css'
import{Parallax, ParallaxLayer } from '@react-spring/parallax';
import { motion, spring } from "motion/react";
import React, { useRef, useEffect, useState } from 'react';


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
          <motion.div className="unselectable"
            initial={{
              y: -1000,
            }}
            transition={{
              duration: 1,
              type: 'spring',
            }}
            animate={{
              y: 0,
            }}
          >
            <BubbleText text="Count" />
          </motion.div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.4} speed={0.2} factor={1}>
          <h2 className="unselectable">My</h2>
        </ParallaxLayer>

        <ParallaxLayer
            offset={2}
            speed={1}
            factor={3.5}
            className='unselectable'
            style={{
              backgroundImage: `url(${fbg})`,
              backgroundSize: "cover",
              backgroundPosition: "center"

            }}
        />

        <ParallaxLayer onClick={()=> ref.current.scrollTo(3.5)} offset={2.4} speed={0.05}>
          <h2 className="unselectable"><BubbleText text="Coins"/></h2>
        </ParallaxLayer>

        <ParallaxLayer sticky={{start:1, end:1.4}} speed={0.005} onClick={()=> ref.current.scrollTo(2.4)}>
          <img className="coin" src={coin} height="95%" width="100%"></img>
        </ParallaxLayer>

        <ParallaxLayer offset={3.5} speed={0.1}>
            <ImportAnimate/>
        </ParallaxLayer>
        
      </Parallax>
      
    </div>
  )
}

function ImportAnimate(){
  const fileInputRef = useRef(null);
  const [results, setResults] = useState(null);   // <-- NEW: store predictions + totals

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result
        .replace("data:image/png;base64,", "")
        .replace("data:image/jpeg;base64,", "")
        .replace("data:image/webp;base64,", "");

      try {
        const response = await fetch(
          "https://serverless.roboflow.com/countmycoins-in8ts/2?api_key=Cc4vrlSzZgkfj7J1qG6y",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: base64Image
          }
        );

        const data = await response.json();
        const predictions = data.predictions;

        // Count each type of coin
        const counts = {};
        predictions.forEach(p => {
          const type = p.class;
          counts[type] = (counts[type] || 0) + 1;
        });

        // Coin values
        const coinValues = {
          penny: 0.01,
          nickel: 0.05,
          dime: 0.10,
          quarter: 0.25
        };

        // Compute total money
        let total = 0;
        for (const coin in counts) {
          total += counts[coin] * coinValues[coin];
        }

        // Store in React state so it appears on screen
        setResults({
          counts,
          total: total.toFixed(2)
        });

      } catch (err) {
        console.error(err);
      }
    };
  };

  return (
    <div className="Container">
      <motion.div className="coinContainer" style={{ height: 300, width: 800 }}>
        <h1 className="unselectable" id="coinTitle">
          Drop your treasure here, let’s count it! 🪙✨
        </h1>

        <motion.button
          onClick={handleClick}
          className="button-53"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          drag
          whileDrag={{ scale: 1.2 }}
          dragConstraints={{
            top: -40,
            left: -90,
            right: 70,
            bottom: 80,
          }}
        >
          Import
        </motion.button>
        
        {results && (
          <div className="resultsBox">
            <h2>Detected Coins:</h2>

            <ul>
              {Object.entries(results.counts).map(([coin, count]) => (
                <li key={coin}>
                  {coin}: {count}
                </li>
              ))}
            </ul>

            <h3>Total Value: ${results.total}</h3>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </motion.div>
    </div>
  );
}


const Example = () => {
  return (
    <div className="grid h-screen place-content-center bg-black">
      <BubbleText />
    </div>
  );
};
//old way of usin functions
const BubbleText = ({ text }) => {
  return (
    <h2 className="text-center text-5xl font-thin text-indigo-300">
      {text.split("").map((char, idx) => (
        <span className="hoverText" key={idx}>
          {char}
        </span>
      ))}
    </h2>
  );
};

export default App
