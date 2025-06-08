import {Routes, Route} from 'react-router-dom'
import './App.css'
import PostsPage from "./components/posts/PostsPage"
import PostDetail from "./components/posts/PostDetail"
import Header from './components/UI/Header'


export default function App() {

  return (
    <div className="flex flex-col items-center-safe justify-center w-full">
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>

    </div>
  )
}
