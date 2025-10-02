import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='min-h-[500px] bg-background bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
