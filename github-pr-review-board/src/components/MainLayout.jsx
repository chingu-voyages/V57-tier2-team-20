import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className=''>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
