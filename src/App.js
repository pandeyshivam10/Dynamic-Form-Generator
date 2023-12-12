// App.js
import React from "react";
import FormGenerator from "./components/FormGenerator";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="App" style={styles.appContainer}>
        <FormGenerator />
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    textAlign: "center",
    paddingTop: "50px",
  },
};

export default App;
