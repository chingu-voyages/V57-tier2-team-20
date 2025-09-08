import { BrowserRouter, Routes, Route } from "react-router"
import MainLayout from "./components/MainLayout"
import OpenPRs from "./pages/OpenPRs"
import LandingPage from "./pages/LandingPage"
import ClosedPRs from "./pages/ClosedPRs"
import NotFound from "./pages/NotFound"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="open-prs" element={<OpenPRs />} />
                    <Route path="closed-prs" element={<ClosedPRs />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
