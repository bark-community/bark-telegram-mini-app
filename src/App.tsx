import React, { useEffect, useState } from "react";
import "./index.css";
import Arrow from "./icons/Arrow";
import { bulldog, coin, highVoltage, bark, rocket, trophy } from "./images";

// Define the type for clicks
interface Click {
  id: number;
  x: number;
  y: number;
}

const App: React.FC = () => {
  // State declarations
  const [points, setPoints] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [clicks, setClicks] = useState<Click[]>([]);

  // Constants
  const POINTS_INCREMENT = 10;
  const ENERGY_COST = 10;
  const MAX_ENERGY = 6500;

  // Handles user clicks
  const handleUserClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy < ENERGY_COST) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prevPoints) => prevPoints + POINTS_INCREMENT);
    setEnergy((prevEnergy) => Math.max(prevEnergy - ENERGY_COST, 0));
    setClicks((prevClicks) => [...prevClicks, { id: Date.now(), x, y }]);
  };

  // Handles end of animation
  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click: Click) => click.id !== id));
  };

  // Restores energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 10, MAX_ENERGY));
    }, 1000); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen">
      {/* Background Overlays */}
      <div className="bg-gradient-overlay"></div>
      <div className="flex items-center justify-center">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        {/* Top Section */}
        <div className="fixed top-0 left-0 w-full px-4 pt-6 z-10 flex flex-col items-center">
          <div className="flex justify-center join-squad-container">
            <button className="join-squad-button">
              <span className="join-squad-text">Join squad</span>
              <Arrow size={18} className="arrow-icon" />
            </button>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} alt="Coin Icon" />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} alt="Trophy Icon" />
            <span className="ml-1">
              Gold <Arrow size={18} className="ml-0 mb-1 inline-block" />
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="Energy Icon" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-lg opacity-75">/ {MAX_ENERGY}</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-yellow-300 py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1 hover:text-gray-800 transition">
                  <img src={bulldog} width={24} height={24} alt="Bulldog Icon" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-yellow-400"></div>
                <button className="flex flex-col items-center gap-1 hover:text-gray-800 transition">
                  <img src={coin} width={24} height={24} alt="Coin Icon" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-yellow-400"></div>
                <button className="flex flex-col items-center gap-1 hover:text-gray-800 transition">
                  <img src={rocket} width={24} height={24} alt="Rocket Icon" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-yellow-400 rounded-full mt-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-100 h-4 rounded-full"
              style={{ width: `${(energy / MAX_ENERGY) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Center Interactive Area */}
        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4 interactive-area" onClick={handleUserClick}>
            <img src={bark} width={256} height={256} alt="Interactive Bark Icon" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0 animate-float"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                12
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
