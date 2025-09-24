import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Hero from "../../components/home/Hero";

describe("Hero component", () => {
    test("renders without crashing", () => {
        render(<Hero />);
        // Check for the main heading
        expect(
            screen.getByRole("heading", { name: /pr status board/i })
        ).toBeInTheDocument();
    });

    test("displays the correct subtitle", () => {
        render(<Hero />);
        expect(
            screen.getByText(/track your team's progress/i)
        ).toBeInTheDocument();
    });

    test("displays the description paragraph", () => {
        render(<Hero />);
        expect(
            screen.getByText(/stop waiting on pr reviews/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/get visibility into your team's github/i)
        ).toBeInTheDocument();
    });

    test("renders the Initialize System button", () => {
        render(<Hero />);
        expect(
            screen.getByRole("button", { name: /initialize system/i })
        ).toBeInTheDocument();
    });

    test("renders all floating squares", () => {
        render(<Hero />);
        // There are 4 floating squares (divs with border and absolute)
        const squares = document.querySelectorAll(
            "section > div.absolute"
        );
        expect(squares.length).toBe(4);
    });

    test("renders color dots", () => {
        render(<Hero />);
        // There are 3 color dots at the bottom
        const dots = document.querySelectorAll(
            "div.flex.items-center.justify-center.gap-6 > div"
        );
        expect(dots.length).toBe(3);
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<Hero />);
        expect(asFragment()).toMatchSnapshot();
    });
});