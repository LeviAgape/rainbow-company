import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/view/HomeView";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </>
  );
}

export default App;
