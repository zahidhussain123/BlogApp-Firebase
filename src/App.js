import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
      <h1>BlogApp</h1>
      <div className="nav__items">
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/create">Create-Post</Link>
            <button
              style={{
                padding: "5px",
                backgroundColor: "crimson",
                color: "white",
                fontWeight: 500,
                fontSize: "20px",
                borderRadius: "5px",
              }}
              onClick={signUserOut}
            >
              logout
            </button>
          </>
        )}
        </div>
      </nav>
      <Routes style={{backgroundColor:"wheat"}}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
