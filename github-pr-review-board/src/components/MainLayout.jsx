import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        {/* <Outlet /> */}
        <Home />
      </main>
      <Footer />
    </div>
  );
}
