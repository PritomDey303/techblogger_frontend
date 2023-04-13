import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./App.scss";
import { router } from "./Routes/routes";
import ToastComponent from "./Shared/Toast/ToastComponent";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <ToastComponent />
    </div>
  );
}

export default App;
