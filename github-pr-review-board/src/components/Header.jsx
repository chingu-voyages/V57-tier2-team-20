import { NavLink } from "react-router"
import logo from "../assets/Codesandbox.svg"


export default function Header() {
    return (
        <header className="bg-[#141923] text-white shadow">
            <nav className="flex justify-between p-4">
                <div className="flex align-items gap-2">
                    <img src={logo} alt="app logo" className="border-[#00FFFF] border-1 p-1 bg-[#01FFFF33]"/> 
                    <h2 className="uppercase text-2xl font-bold text-[#00FFFF]">pr status board</h2>
                </div>
                <div>
                    <NavLink
                        className={({ isActive }) =>
                            `px-4 py-2 transition-colors duration-200 border-[#01FFFF33] border-1 ${
                                isActive
                                    ? "bg-[#00FFFF] text-[#1E232D] shadow"
                                    : "hover:bg-[#01FFFF33]"
                            }`
                        }
                        to="."
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `px-4 py-2 transition-colors duration-200 border-[#01FFFF33] border-1 ${
                                isActive
                                    ? "bg-[#00FFFF] text-[#1E232D] shadow"
                                    : "hover:bg-[#01FFFF33]"
                            }`
                        }
                        to="open-prs"
                    >
                        Open PRs
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `px-4 py-2 transition-colors duration-200 border-[#01FFFF33] border-1 ${
                                isActive
                                     ? "bg-[#00FFFF] text-[#1E232D] shadow"
                                    : "hover:bg-[#01FFFF33]"
                            }`
                        }
                        to="closed-prs"
                    >
                        Closed PRs
                    </NavLink>
                
                </div>
                <div>
                    <date>september 2025</date>
                </div>
            </nav>
        </header>
    )
}
