import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../layout/Layout";
import ListingPage from "../Page/listingClinik";
import BlogPage from "../Page/blog";
import ContactPage from "../Page/contact";
import AboutPage from "../Page/about";
import BlogDetails from "../Page/blogDetails";
import AllClinic from "../Page/allClinics";
import SignUp from "../Page/auth/SignUp";
import SignIn from "../Page/auth/SignIn";
import OTPVerification from "../Page/auth/Varification";
import ForgotPassword from "../Page/auth/ForgotPassword";
import ResetPassword from "../Page/auth/ResetPassword";
import ClinicDetails from "../Page/ClinicDetails";
import BookingPage from "../Page/clinicBooking";
import UserAccount from "../Page/userAccount";
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
      className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all"
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
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<Loader />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/varification",
        element: (
          <Suspense fallback={<Loader />}>
            <OTPVerification />
          </Suspense>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
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
      {
        path: "/see-all-clinic",
        element: (
          <Suspense fallback={<Loader />}>
            <AllClinic />
          </Suspense>
        ),
      },
      {
  path: "/clinic-details/:slug",
  element: (
    <Suspense fallback={<Loader />}>
      <ClinicDetails />
    </Suspense>
  ),
},
{
  path: "/clinic-details/id/:id",
  element: (
    <Suspense fallback={<Loader />}>
      <ClinicDetails />
    </Suspense>
  ),
},
{
  path: "/booking-form",
  element: (
    <Suspense fallback={<Loader />}>
      <BookingPage />
    </Suspense>
  ),
},
{
  path: "/user-account",
  element: (
    <Suspense fallback={<Loader />}>
      <UserAccount />
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