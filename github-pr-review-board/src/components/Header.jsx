import { NavLink } from "react-router"

export default function Header() {
    return (
        <header className="bg-gray-800 text-white shadow">
            <nav className="flex justify-center gap-8 py-4">
                <NavLink
                    className={({ isActive }) =>
                        `px-4 py-2 rounded transition-colors duration-200 ${
                            isActive
                                ? "bg-white text-gray-800 font-bold shadow"
                                : "hover:bg-gray-700"
                        }`
                    }
                    to="."
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `px-4 py-2 rounded transition-colors duration-200 ${
                            isActive
                                ? "bg-white text-gray-800 font-bold shadow"
                                : "hover:bg-gray-700"
                        }`
                    }
                    to="open-prs"
                >
                    Open PRs
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `px-4 py-2 rounded transition-colors duration-200 ${
                            isActive
                                ? "bg-white text-gray-800 font-bold shadow"
                                : "hover:bg-gray-700"
                        }`
                    }
                    to="closed-prs"
                >
                    Closed PRs
                </NavLink>
            </nav>
        </header>
    )
}
