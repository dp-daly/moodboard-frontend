import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HorizontalNavbar from './components/common/HorizontalNavbar';
import Index from './components/common/Index';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import UserProfile from './components/auth/UserProfile';
import CreateBoard from './components/moodboard/CreateBoard';
import Moodboard from './components/moodboard/Moodboard';
import EditBoard from './components/moodboard/EditBoard';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <Router>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <HorizontalNavbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/:userId" element={<UserProfile />} />
              <Route path="/create" element={<CreateBoard />} />
              <Route path="/:userId/:boardId" element={<Moodboard />} />
              <Route path="/:userId/:boardId/edit" element={<EditBoard />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;