import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./components/MainLayout";
import OpenPRs from "./pages/OpenPRs";
import LandingPage from "./pages/LandingPage";
import ClosedPRs from "./pages/ClosedPRs";
import NotFound from "./pages/NotFound";
import PRStartScreen from "./components/PR/PRStartScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<MainLayout />}
        >
          <Route
            index
            element={<LandingPage />}
          />
          <Route
            path='open-prs'
            element={<PRStartScreen 
            title="Open PRs Dashboard"
            description="Initialize a repository from the home page to view open pull"
            icon="solar:folder-open-outline"
            EmptyComponent={OpenPRs}
            theme={{
              primary: "bg-brand-primary",
              icon: "text-white",
              text: "text-white",
              border: "border-brand-primary/20"
            }}
            />}
          />
          <Route
            path='closed-prs'
            element={<PRStartScreen 
            title="Closed Pull Requests"
            description="Initialize a repository from the home page to view closed pull requests"
            icon="solar:folder-check-outline"
            EmptyComponent={ClosedPRs}
            theme={{
              primary: "bg-brand-secondary",
              icon: "text-brand-secondary", // bright pink
              text: "text-brand-secondary",
              border: "border-brand-secondary/20"
            }}
            />}
          />
        </Route>
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
