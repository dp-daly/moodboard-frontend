import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Index from './components/Index'
import Signup from './components/Signup'
import CreateBoard from './components/CreateBoard'
import Signin from './components/Signin'
import Moodboard from './components/Moodboard'
import ShowObject from './components/ShowObject'
import Footer from './components/Footer'


const App = () => {

  return <Router>
  <div className="page-wrapper"> 
  <Navbar />
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/create" element={<CreateBoard />} />
    <Route path="/:userId/:boardId" element={<Moodboard />} />
    <Route path="/:userId/:boardId/:objectId" element={<ShowObject />} />
  </Routes>
  <Footer />
  </div>
</Router>

}

export default App
