import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
