import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";

function App() {


  return (
    <BrowserRouter>
      <Toaster/>
      <Router/>
    </BrowserRouter>
  );
}

export default App;
