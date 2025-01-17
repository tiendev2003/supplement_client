import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <nav>Navigation Bar (Montserrat)</nav>
        <h1>Main Title (Roboto Slab)</h1>
        <p className="subtitle">This is a subtitle using the Lora font.</p>
        <button>Click Me (Quicksand)</button>
        <article>
          <p>
           Trần Công Tiến đẹp trai nhớ nhung người yêu
          </p>
        </article>
        <blockquote>
          "This is a quote using Playfair Display font for a sophisticated
          look."
        </blockquote>
        <label>Form Label (Nunito)</label>
      </div>
    </>
  );
}

export default App;
