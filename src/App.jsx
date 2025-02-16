/* eslint-disable no-unused-vars */
import "bootstrap/dist/js/bootstrap.bundle";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import "./App.scss";
import Login from "./components/auth/login";
import PrivateRoutes from "./components/authRoutes/privateRoutes";
import PublicRoutes from "./components/authRoutes/publicRoutes";
import { useAuth } from "./components/authRoutes/useAuth";
import NotFound from "./components/pages/notFound";
import "./components/styles/main.css";
import "./index.css";
import BlogCategory from "./components/pages/createBlogCategory";
import HeaderService from "./components/pages/headerService";
import ServiceCategory from "./components/pages/createServiceCategories";
import Services from "./components/pages/services";
import ServiceForm from "./components/pages/serviceForm";
import StaticPage from "./components/pages/staticPages";
import StaticPageForm from "./components/pages/staticPageForm";
import LandingServices from "./components/pages/landingServices";
import LandingServiceForm from "./components/pages/landingServiceForm";

const NavHeader = lazy(() => import("./components/header/navHeader"));
const SidebarMenu = lazy(() => import("./components/pages/sidebar"));
const LoginPage1 = lazy(() => import("./components/auth/login"));
const Dashboard = lazy(() => import("./components/pages/dashboard"));
const HeaderForm = lazy(() => import("./components/pages/headerForm"));
const Blogs = lazy(() => import("./components/pages/blogs"));
const BlogManagement = lazy(() => import("./components/pages/blogManagement"));

function App() {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();
  const isLogin = useAuth();

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <SidebarMenu
        toggled={toggled}
        setBroken={setBroken}
        broken={broken}
        setToggled={setToggled}
      >
        {isLogin && (
          <NavHeader
            toggled={toggled}
            setBroken={setBroken}
            broken={broken}
            setToggled={setToggled}
          />
        )}
        <Suspense
          fallback={
            <main className="h-screen flex flex-col justify-center items-center">
              <HashLoader  className="mx-auto"   color="#1857d2" />
            </main>
          }
        >
          <ScrollToTop />
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/auth/login" element={<Login />}></Route>
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/service/management" element={<Services />} />
              <Route path="/service/form" element={<ServiceForm />} />
              <Route path="/service/header" element={<HeaderService />} />
              <Route path="/service/header/form" element={<HeaderForm />} />
              <Route path="/landing/service" element={<LandingServices />} />
              <Route path="/landing/service/form" element={<LandingServiceForm />} />
              <Route path="/service/category" element={<ServiceCategory />} />
              <Route path="/blog/management" element={<BlogManagement />} />
              <Route path="/blog/form" element={<Blogs />} />
              <Route path="/blog/category" element={<BlogCategory />} />
              <Route path="/static" element={<StaticPage />} />
              <Route path="/static/header/form" element={<StaticPageForm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SidebarMenu>
    </>
  );
}
export default App;
