import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
