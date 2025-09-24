import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import Header from "../../components/Header.jsx"
import { MemoryRouter } from "react-router-dom"

describe("Header component", () => {
    test("renders header with correct text", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        const headerElement = screen.getByText(/PR Status Board/i)
        expect(headerElement).toBeInTheDocument()
    })

    test("renders logo image", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        const logo = screen.getByAltText(/app logo/i)
        expect(logo).toBeInTheDocument()
    })

    test("renders navigation links", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        expect(screen.getByText(/Home/i)).toBeInTheDocument()
        expect(screen.getByText(/Open PRs/i)).toBeInTheDocument()
        expect(screen.getByText(/Closed PRs/i)).toBeInTheDocument()
    })
 
    test("renders today's date", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        const today = new Date()
        const formattedDate = today.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        expect(screen.getAllByText(formattedDate)[0]).toBeInTheDocument()
    })
})
