import { NavLink } from "react-router-dom";
import logo from "../assets/Codesandbox.svg";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const today = new Date();
  const formattedDate = today?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) || "Date unavailable";

  const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // 👈 ref for the dropdown menu

  // ✅ Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-[#141923] bg-[linear-gradient(90deg,rgba(1,255,255,0.05)_0%,rgba(1,255,255,0)_50%,rgba(255,0,128,0.05)_100%)] text-white border-t-8 border-transparent [border-image:linear-gradient(to_right,#00FFFF,#8A2BE2,#FF0080)_1] ">
      <nav className="flex justify-between  items-stretch px-4 py-2 border-b-2 border-[#01FFFF33] relative">

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="app logo"
            className="border-[#00FFFF] border p-1 bg-[#01FFFF33]"
          />
          <p className="uppercase text-xl md:text-base lg:text-xl font-bold text-[#00FFFF] tracking-wider">
            PR Status Board
          </p>
        </div>

       

        {/* Hamburger button (mobile only) */}
        <div className="md:hidden flex items-center border-1 p-1 border-[#01ffff33]">
        {isOpen ? 
            <Icon 
              color="#00ffff" 
              icon="solar:list-up-minimalistic-broken" 
              width="24" 
              height="24" 
              onClick={() => setIsOpen(!isOpen) } 
            /> :
                <Icon  
                  icon="solar:hamburger-menu-broken" 
                  width="24" height="24"
                  onClick={() => setIsOpen(!isOpen) }
                  color="#00FFFF"
                />
          }
        </div>

        {/* Nav links + mobile date (mobile dropdown) */}
        <div
          ref={menuRef}
          className={`
            ${isOpen ? "flex flex-col items-stretch w-full p-2 " : "hidden md:flex"}
            md:flex-row  md:items-stretch md:p-0 md:m-0
            absolute md:static top-full left-0 w-full md:w-auto md: bg-[#141923] md:bg-transparent
            z-50
          `}
        >
          {/* Mobile date (only visible on mobile when menu is open) */}
          <div className={`flex items-center justify-center text-text mb-2 md:hidden border-1 border-[#01FFFF33] px-4 py-2
            ${formattedDate === "Date unavailable"
            ? "border-warning/20 text-warning/20"
            : "border-brand-primary/30 text-text"
            }
            `}>
            <Icon
            icon={
              formattedDate === "Date unavailable"
                ? "solar:history-3-broken" // a different icon for unavailable
                : "solar:clock-circle-outline" // normal icon
            }
            width="24"
            height="24"
            color={formattedDate === "Date unavailable" ? "brand-warning" : "text"} 
            />
            <p className="uppercase text-sm ml-2">{formattedDate}</p>
          </div>

          {/* Nav links (tightly packed) */}
          <NavLink
            to="."
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 transition-colors duration-200 border-1 border-[#01FFFF33] px-4 py-2 ${
                isActive ? "bg-[#00FFFF] text-[#1E232D] shadow" : "hover:bg-[#01FFFF]/60 text-white"
              }`
            }
          >
            <Icon icon="solar:home-outline" width="24" height="24" />            
            Home
          </NavLink>

          <NavLink
            to="open-prs"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-center gap-2 transition-colors duration-200 border-1 border-[#01FFFF33] px-4 py-2 ${
                isActive ? "bg-[#00FFFF] text-[#1E232D] shadow" : "hover:bg-[#01FFFF]/60 text-white"
              }`
            }
          >
            <Icon icon="solar:file-send-outline" width="24" height="24" />
            Open PRs
          </NavLink>

          <NavLink
            to="closed-prs"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-center gap-2  transition-colors duration-200 border-1 border-[#01FFFF33] px-4 py-2 ${
                isActive ? "bg-[#00FFFF] text-[#1E232D] shadow" : "hover:bg-[#01FFFF]/60 text-white"
              }`
            }
          >
            <Icon icon="solar:file-check-outline" width="24" height="24" />
            Closed PRs
          </NavLink>
        </div>
         {/* Desktop date (always visible on md+) */}
        <div className={`hidden md:flex items-center text-text border-1 border-[#01FFFF33] px-4 py-2 ml-4
            ${formattedDate === "Date unavailable"
            ? "border-warning/30 text-warning/20"
            : "border-[#01FFFF33] text-text"
            }
          `}>
          <Icon
            icon={
              formattedDate === "Date unavailable"
                ? "solar:history-3-broken" // a different icon for unavailable
                : "solar:clock-circle-outline" // normal icon
            }
            width="24"
            height="24"
            color={formattedDate === "Date unavailable" ? "brand-warning" : "text"} 
            />         
          <p className="uppercase text-sm ml-2">{formattedDate}</p>
        </div>
      </nav>
    </header>
  );
}
