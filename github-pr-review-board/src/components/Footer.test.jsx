import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Footer from "./Footer"

describe("Footer component", () => {
    test("renders team section title", () => {
        render(<Footer />)
        const title = screen.getByText(/Neural Network Development Team/i)
        expect(title).toBeInTheDocument()
    })

    test("renders all team member names", () => {
        render(<Footer />)
        const names = [
            "Chinedu Oleka",
            "Ayo Alabi",
            "Alexander Makoveev",
            "Ouassima El Yakoubi",
            "Ebhamen Joshua",
            "Nadiia Lashtun",
            "Dascom",
            "Hamza El Assri",
        ]
        names.forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument()
        })
    })

    test("renders github repository link", () => {
        render(<Footer />)
        const repoLink = screen.getByRole("link", {
            name: /github repository/i,
        })
        expect(repoLink).toBeInTheDocument()
        expect(repoLink).toHaveAttribute(
            "href",
            "https://github.com/chingu-voyages/V57-tier2-team-20"
        )
    })

    test("renders copyright", () => {
        render(<Footer />)
        expect(
            screen.getByText(/© 2025 #GitHub PR Review Board/i)
        ).toBeInTheDocument()
    })
})
