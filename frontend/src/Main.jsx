import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Login'
import { Toaster } from 'react-hot-toast'

const App = React.lazy(() => import('./App'))
export default function Main() {
    return (
        <Suspense fallback={<div className='fixed top-0 h-screen w-screen z-50'><div className='blob'></div></div> }>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/home' element={<App />} />
                </Routes>
                <Toaster position='bottom-center' />
            </BrowserRouter>
        </Suspense>
    )
}
