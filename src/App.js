import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Placeholders/Error";
import RestaurantMenu from "./pages/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { fetchUserLocation } from "./redux/slices/locationSlice/locationActions";
import CategoryDetails from "./pages/Category/CategoryDetails";

const AppLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserLocation());
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/restaurant/category/:categoryId",
        element: <CategoryDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
