import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import {Game} from "./game/components/game.js";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/Game">
        <Route index element={<Game />} />
      </Route>  
      <Route
          path="*"
          element={<Navigate to="/Game" replace />}
        />    
    </Routes>
  </Router>   
  );
}

export default App;
