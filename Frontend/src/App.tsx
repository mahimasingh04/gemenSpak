

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/signup.tsx'
import { Signin } from './pages/signin.tsx'
import { Blog } from './pages/blog.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
