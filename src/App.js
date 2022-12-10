import { RouterProvider } from 'react-router-dom';
import './App.css';
import './App.scss'
import { router } from './Routes/routes';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
