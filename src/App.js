// import logo from './logo.svg';
import React, { useState } from "react";
import "./App.css";
import Trie from "./prefixtree.js";
function App() {
  const [options, setOption] = useState([]);
  const autocomplete = (e) => {
    const trie = new Trie();
    trie.insert("apple");
    trie.insert("apps");
    trie.insert("applet");
    console.log(e.target.value);

    setOption(trie.autocomplete(e.target.value));
  };

  return (
    <div className="App">
      <form>
        <h2>Auto Complete Form</h2>
        <input type="text" name="city" list="cityname" onKeyUp={autocomplete} />
        <datalist id="cityname">
          {options ? (
            options.map((value) => <option key={value} value={value} />)
          ) : (
            <option key="dummy" value=""></option>
          )}
        </datalist>
      </form>
    </div>
  );
}

export default App;
