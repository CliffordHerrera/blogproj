import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import PostsPage from "./components/posts/PostsPage"
import PostDetail from "./components/posts/PostDetail"


export default function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center-safe justify-center">
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>

    </div>
  )
}


