import { Routes, Route } from "react-router-dom";
import { HomeView } from "./components/view/HomeView";
import { globalStyles } from "./globalStyles";
function App() {
  return (
    <>
      {globalStyles}
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </>
  );
}

export default App;
