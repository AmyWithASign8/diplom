import { Dispatch, SetStateAction, useEffect, useState } from "react"

export const resizeHandlers = new Set<Dispatch<SetStateAction<number>>>()

export const useScreenSize = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        resizeHandlers.add(setWindowSize)

        return () => {
            resizeHandlers.delete(setWindowSize)
        }
    }, [])

    return windowSize
}
