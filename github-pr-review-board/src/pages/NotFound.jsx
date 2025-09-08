import { Link } from "react-router"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Sorry, the page you were looking for was not found
            </h1>
            <Link
                to="/"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors font-semibold"
            >
                Return to home
            </Link>
        </div>
    )
}
