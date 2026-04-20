import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../layout/Layout";
import ListingPage from "../Page/listingClinik";
import BlogPage from "../Page/blog";
import ContactPage from "../Page/contact";
import AboutPage from "../Page/about";
import BlogDetails from "../Page/blogDetails";
// import NotFound from "../components/custom/NotFound";

/* -------------------- LAZY PAGES -------------------- */
const Home = lazy(() => import("../Page/home"));
// const Pricing = lazy(() => import("../pages/Pricing"));

/* -------------------- LOADER -------------------- */
const Loader = () => (
  <div className="flex items-center justify-center min-h-[40vh] text-lg font-semibold text-(--text)">
    Loading...
  </div>
);

/* -------------------- ERROR UI -------------------- */
const ErrorBoundary = () => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-6 gap-4">
    <h1 className="text-3xl font-bold text-red-600">
      Something went wrong 🚨
    </h1>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-(--accent) text-white rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all"
    >
      Reload Page
    </button>
  </div>
);

/* -------------------- ROUTER -------------------- */
const router = createBrowserRouter([
  {
    /* Layout wraps every route — Navbar + Footer are rendered once */
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/list-your-clinic",
        element: (
          <Suspense fallback={<Loader />}>
            <ListingPage />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<Loader />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
  path: "/blog/:slug",
  element: (
    <Suspense fallback={<Loader />}>
      <BlogDetails />
    </Suspense>
  ),
},
{
  path: "/blog/id/:id",
  element: (
    <Suspense fallback={<Loader />}>
      <BlogDetails />
    </Suspense>
  ),
},
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "/about-us",
        element: (
          <Suspense fallback={<Loader />}>
            <AboutPage />
          </Suspense>
        ),
      },
    //   {
    //     path: "/pricing",
    //     element: (
    //       <Suspense fallback={<Loader />}>
    //         <Pricing />
    //       </Suspense>
    //     ),
    //   },
    //   {
    //     path: "*",
    //     element: <NotFound />,
    //   },
    ],
  },
]);

export default router;