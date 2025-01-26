import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import Setup from '@pages/Setup'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
