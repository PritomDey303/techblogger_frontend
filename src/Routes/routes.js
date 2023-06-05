import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import CategoryTemplate from "../Pages/CategoryTemplate/CategoryTemplate";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import SinglePost from "../Pages/SinglePost/SinglePost";
import ProtectedRoute from "../Shared/ProtectedRoute/ProtectedRoute";
import TextToxicityDetector from "../Test/Test";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: (
          <ProtectedRoute>
            <SinglePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category/:id",
        element: <CategoryTemplate />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/test",
        element: <TextToxicityDetector />,
      },
    ],
  },
]);
