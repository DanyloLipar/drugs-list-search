import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DrugList from "../../components/DrugList";
import DrugDetails from "../../components/DrugDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DrugList />,
  },
  {
    path: "/drug/:id",
    element: <DrugDetails />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
