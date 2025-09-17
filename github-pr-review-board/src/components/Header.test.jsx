import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import Header from "./Header.jsx"
import { MemoryRouter } from "react-router-dom" 

describe("Header component", () => {
    // Grouping related tests can be done here if needed
    test("renders header with correct text", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        const headerElement = screen.getByText(/PR Status Board/i)
        expect(headerElement).toBeInTheDocument()
    })
})
