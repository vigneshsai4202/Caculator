import React, { useState, useEffect } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "⌫") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        // eslint-disable-next-line no-eval
        setResult(eval(input));
      } catch {
        setResult("Error");
      }
    } else if (value === "√") {
      setResult(Math.sqrt(Number(input)));
    } else if (value === "x²") {
      setResult(Math.pow(Number(input), 2));
    } else {
      setInput(input + value);
    }
  };

  // Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      if (!isNaN(e.key) || "+-*/.%".includes(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        try {
          // eslint-disable-next-line no-eval
          setResult(eval(input));
        } catch {
          setResult("Error");
        }
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key === "Escape") {
        setInput("");
        setResult("");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [input]);

  const buttons = [
    "C", "⌫", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "√", "x²",
    "="
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result}</div>
      </div>

      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            className={btn === "=" ? "equals" : ""}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
