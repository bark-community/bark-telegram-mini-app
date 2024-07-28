import React, { useState } from "react";
import Click from "./Click"; // Assume this is the correct path to your Click component

interface ClickData {
  id: number;
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [clicks, setClicks] = useState<ClickData[]>([]);

  const handleUserClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newClick: ClickData = { id: Date.now(), x, y };
    setClicks((prevClicks) => [...prevClicks, newClick]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  return (
    <div className="relative" style={{ width: "100vw", height: "100vh" }} onClick={handleUserClick}>
      {clicks.map((click) => (
        <Click key={click.id} id={click.id} x={click.x} y={click.y} onAnimationEnd={handleAnimationEnd} />
      ))}
    </div>
  );
};

export default App;
