import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Recommendation from './pages/Recommendation.jsx';
import Mypage from './pages/Mypage.jsx';
import Login from './pages/Login.jsx';
import Join from './pages/Join.jsx';
import Crew from './pages/Crew.jsx';
import axios from 'axios';
import Challenge from './pages/Challenge';
import 'antd/dist/reset.css';

axios.defaults.baseURL = process.env.REACT_APP_URL;
// axios.defaults.baseURL = 'http://3.35.48.121:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/chat" element={<Crew />} />
        <Route path="/crew/:page" element={<Crew />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/crew" element={<Crew />} />
      </Routes>
    </div>
  );
}

export default App;
