// export function Home() {
//   return (
//     <div className="banner">
//       <h1 className="h1 display-4">Welcome to my BookStore!</h1>
//       <div>
//         {/* <img
//           src="https://polki.pl/foto/4_3_LARGE/100-ksiazek-polecanych-przez-internautow-307149.webp"
//           alt=""
//         /> */}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import "../Home.css";

interface Butterfly {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
}

export function Home() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    const createButterfly = () => {
      const butterfly: Butterfly = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speedX: (Math.random() - 0.5) * 3, // Prędkość pozioma
        speedY: (Math.random() - 0.5) * 4, // Prędkość pionowa
      };
      setButterflies((prevButterflies) => [...prevButterflies, butterfly]);
    };

    const updateButterflies = () => {
      setButterflies((prevButterflies) =>
        prevButterflies.map((butterfly) => ({
          ...butterfly,
          x: butterfly.x + butterfly.speedX,
          y: butterfly.y + butterfly.speedY,
        }))
      );
    };

    const interval = setInterval(() => {
      if (butterflies.length < 10) {
        createButterfly();
      }
      updateButterflies();
    }, 1000 / 60); // Aktualizacja co około 1/60 sekundy

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="banner">
      <div className="butterfly-container">
        {butterflies.map((butterfly, index) => (
          <div
            key={index}
            className="butterfly"
            style={{ left: butterfly.x, top: butterfly.y }}
          ></div>
        ))}
      </div>
      <h1 className="h1 display-4">Welcome to my BookStore!</h1>
    </div>
  );
}
