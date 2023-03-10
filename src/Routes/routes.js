import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Page404 from "../page/404/Page404";
import Blog from "../page/Blog/Blog";
import AllBuyers from "../page/Dashboard/Admin/AllBuyers";
import AllSellers from "../page/Dashboard/Admin/AllSellers";
import MyOrders from "../page/Dashboard/Buyers/MyOrders";
import Payment from "../page/Dashboard/Payment/Payment";
import AddAProduct from "../page/Dashboard/Sellers/AddAProduct";
import MyProducts from "../page/Dashboard/Sellers/MyProducts";
import CategoriesAll from "../page/Home/Categories/CategoriesAll/CategoriesAll";
import CategoriseItem from "../page/Home/Categories/CategoriseItem/CategoriseItem";
import Home from "../page/Home/Home";
import Login from "../page/Login/Login";
import Signup from "../page/Login/Signup";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <CategoriesAll />,
      },

      {
        path: "/categories/:slug",
        loader: async ({ params }) =>
          await fetch(`https://puran-bazar-server.vercel.app/categories/${params.slug}`, {
            headers: {
              authorization: `bearer ${localStorage.getItem("access-token")}`,
            },
          }),
        element: <CategoriseItem />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "*",
        element: <Page404></Page404>,
      },
      {
        path: "/bglog",
        element: <Blog></Blog>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/add-a-product",
        element: <AddAProduct></AddAProduct>,
      },
      {
        path: "/dashboard/my-product",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/all-bauyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`https://puran-bazar-server.vercel.app/bookings/pay/${params.id}`),
      },
    ],
  },
]);
export default router;
