import React, { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import SuspenseLoader from "../../shared/components/suspense-loader";

export const withRouter = (component: () => React.ReactNode) => () =>
    (
        <BrowserRouter>
            <Suspense fallback={<SuspenseLoader />}>{component()}</Suspense>
        </BrowserRouter>
    )