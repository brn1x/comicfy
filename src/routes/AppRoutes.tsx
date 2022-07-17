import React from 'react'
import { Outlet, Routes, Route } from 'react-router-dom'
import MainLayout from '../components/MainLayout'

import Home from '../pages/Home'
import Setup from '../pages/Setup'

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<Setup />} />
      </Route>
    </Routes>
  )
}