import React, { useEffect } from "react"
import {resizeHandlers} from "../../shared/hooks";

export const withResizeObserver = (component: () => React.ReactNode) => () => {
    function handleResize() {
        resizeHandlers.forEach((handler) => handler(window.innerWidth))
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return <>{component()}</>
}
