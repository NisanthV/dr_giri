import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home"; // Import the Home component
import Books from "./pages/Books"; // Import the Books component
import Colleges from "./pages/Colleges"; // Import the Colleges component
import Products from "./pages/Products"; // Import the Products component
import About from "./pages/About"; // Import the About component
import Jobs from "./pages/Jobs"; // Import the Jobs component
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import JobManage from "./pages/JobManage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="jobs" element={<Jobs />} />
        <Route path="/manage" element={<JobManage />} />
      </Routes>
    </div>
  );
}

export default App;
