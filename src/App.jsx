import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Index from './components/common/Index'
import Signup from './components/auth/Signup'
import CreateBoard from './components/moodboard/CreateBoard'
import Signin from './components/auth/Signin'
import Moodboard from './components/moodboard/Moodboard'
import ShowObject from './components/moodboard/ShowObject'
import Header from './components/common/Header'
import Footer from './components/common/Footer'


const App = () => {
  return <Router>
      <div className="page-wrapper">
        <Navbar />
        <div className="content-wrapper">
        <Header /> 
        <div className="content">
        </div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/create" element={<CreateBoard />} />
            <Route path="/:userId/:boardId" element={<Moodboard />} />
            <Route path="/:userId/:boardId/:objectId" element={<ShowObject />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
}

export default App
