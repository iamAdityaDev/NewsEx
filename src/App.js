import "./App.css";
import React from "react";
import Navbar from "./component/navbar";
import News from "./component/news";
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";

const App = () => {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<News key='general' country="in" category="general" />}
            />
            <Route
              path="/sports"
              element={<News key='sports' country="in" category="sports" />}
            />
            <Route
              path="/business"
              element={<News key='business' country="in" category="business" />}
            />
             <Route
              path="/health"
              element={<News key='health' country="in" category="health" />}
            />
             <Route
              path="/entertainment"
              element={<News key='entertainment' country="in" category="entertainment" />}
            />
            <Route
              path="/general"
              element={<News key='general' country="in" category="general" />}
            />
            <Route
              path="/technology"
              element={<News key='technology' country="in" category="technology" />}
            />
             <Route
              path="/science"
              element={<News key='science' country="in" category="science" />}  
            />
          </Routes>
        </Router>
      </div>
    );
  }

export default App;