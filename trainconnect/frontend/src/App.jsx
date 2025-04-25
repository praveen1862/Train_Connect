import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Banner from './banner.jsx';
import BookingInitial from './bookinginitial.jsx';
import Bookings from './bookings.jsx';
import Tickets from './tickets.jsx';
import Help from './help.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Footer from './footer.jsx';
import TrainList from './trainlist.jsx';
import TrainSeat from './trainseat.jsx';
import Dashboard from './dashboard.jsx';
import SearchTrain from './searchTrain.jsx';
import LiveTrainStatus from './liveTrainStatus.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Banner /><BookingInitial /></>} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/liveTrainStatus" element={<LiveTrainStatus/>}/> 
        <Route path="/trainlist" element={<TrainList />} />
        <Route path="/searchTrain" element={<SearchTrain />} />
        <Route path="/trainseat" element={<TrainSeat />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
