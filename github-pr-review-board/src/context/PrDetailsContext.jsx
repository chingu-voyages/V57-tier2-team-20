import { createContext, useContext, useState } from "react"

const PrDetailsContext = createContext(null)

export function PrDetailsProvider({ children }) {
    const [newPrDetails, setNewPrDetails] = useState(() => {
        const currentOrgRepo = JSON.parse(localStorage.getItem("currentOrgRepo") || "{}")
        if (currentOrgRepo.orgName && currentOrgRepo.repoName) {
            return { ...currentOrgRepo }
        }
        return {}
    })

    return (
        <PrDetailsContext.Provider value={{ newPrDetails, setNewPrDetails }}>
            {children}
        </PrDetailsContext.Provider>
    )
}

export function usePrDetails() {
    const context = useContext(PrDetailsContext)
    if (!context) {
        throw new Error("usePrDetails must be used within a PrDetailsProvider")
    }
    return context
}
