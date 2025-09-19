import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import SolutionBenefits from "../../components/home/SolutionBenefits";

describe("SolutionBenefits component", () => {
    test("renders without crashing", () => {
        render(<SolutionBenefits />);
        // Check for the header text
        expect(screen.getByText(/SOLUTION BENEFITS/i)).toBeInTheDocument();
    });

    test("displays the correct section description", () => {
        render(<SolutionBenefits />);
        expect(
            screen.getByText(/Transform your development workflow with comprehensive PR tracking/i)
        ).toBeInTheDocument();
    });

    test("renders all three benefit cards", () => {
        render(<SolutionBenefits />);
        expect(screen.getByText(/real-time pr tracking/i)).toBeInTheDocument();
        expect(screen.getByText(/historical insights/i)).toBeInTheDocument();
        expect(screen.getByText(/team dashboard/i)).toBeInTheDocument();
    });

    test("renders correct card descriptions", () => {
        render(<SolutionBenefits />);
        expect(
            screen.getByText(/Monitor current PRs awaiting for review with live status updates/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Track completed PR history and\s*team performance metrics/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Customized views for GitHub repositories with role-based access/i)
        ).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<SolutionBenefits />);
        expect(asFragment()).toMatchSnapshot();
    });
});