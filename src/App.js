import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase'; // Assuming your firebase.js file is in the same directory

import Login from './components/Login';
import CreateJob from './components/CreateJob';
import JobDetails from './components/JobDetails';
import ApplyJob from './components/ApplyJob';
import ResponseManagement from './components/ResponseManagement';
import Notifications from './components/Notifications';
import NotificationHistory from './components/NotificationHistory';

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Add an authentication state listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div>
        {/* Your app's navigation or header could go here */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-job" element={user ? <CreateJob user={user} /> : <Login />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route
            path="/responses/:jobId"
            element={user ? <ResponseManagement /> : <Login />}
          />
          <Route path="/notifications" element={<Notifications user={user} />} />
          <Route
            path="/notification-history"
            element={<NotificationHistory user={user} />}
          />
          {/* Add more routes as needed */}
          <Route path="/" element={<h1>Welcome to your Hiring Portal!</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
