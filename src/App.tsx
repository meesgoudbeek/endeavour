import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Detail from "./pages/Detail";
import Footer from "./components/Footer";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
