import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AuthContextProvider from "./Context/AuthContextProvider";
import User from "./pages/User/User";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "user/:id", element: <User /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={route} />
      </AuthContextProvider>
    </>
  );
}

export default App;
