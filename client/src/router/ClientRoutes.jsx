import LoadingPage from 'components/common/LoadingPage'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
const DynamicPage = lazy(() => import("views/client_views/DynamicPage"));

const ClientRoutes = () => {
    return <Suspense fallback={<LoadingPage />}>
        <Routes>
            <Route path="*" element={<DynamicPage />} />
        </Routes>
    </Suspense>

}

export default ClientRoutes