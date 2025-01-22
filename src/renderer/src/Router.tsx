import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import Setup from '@pages/Setup'

import Layout from '@renderer/Layout'

const Router: React.FC = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default Router
