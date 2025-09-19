import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import BuildFor from "../../components/home/BuiltFor";

describe("BuildFor component", () => {
    test("renders without crashing", () => {
        render(<BuildFor />);
        // Check for a root element or a known text
        expect(screen.getByTestId("build-for-root")).toBeInTheDocument();
    });

    test("displays the correct title", () => {
        render(<BuildFor />);
        expect(screen.getByText(/Built for Development Teams/i)).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<BuildFor />);
        expect(asFragment()).toMatchSnapshot();
    });
});