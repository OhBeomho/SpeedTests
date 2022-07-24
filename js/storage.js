export function useStorage() {
    const getHighestCPS = () => localStorage.getItem("HIGHEST_CPS") ?? 0
    const getHighestHPS = () => localStorage.getItem("HIGHEST_HPS") ?? 0
    const getLowestMS = () => localStorage.getItem("LOWEST_MS") ?? 0

    const setHighestCPS = newRecord => localStorage.setItem("HIGHEST_CPS", newRecord)
    const setHighestHPS = newRecord => localStorage.setItem("HIGHEST_HPS", newRecord)
    const setLowestMS = newRecord => localStorage.setItem("LOWEST_MS", newRecord)

    return {
        getHighestCPS,
        getHighestHPS,
        getLowestMS,
        setHighestCPS,
        setHighestHPS,
        setLowestMS
    }
}