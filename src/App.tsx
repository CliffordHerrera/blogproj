import {Routes, Route} from 'react-router-dom'
import './App.css'
import PostsPage from "./Pages/PostsPage"
import PostDetail from "./Pages/PostDetail"
import Header from './components/UI/Header'
import { postDetailPath } from './constants'

export default function App() {

  return (
    <div className="flex flex-col items-center-safe justify-center w-full">
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path={postDetailPath} element={<PostDetail />} />
      </Routes>

    </div>
  )
}
