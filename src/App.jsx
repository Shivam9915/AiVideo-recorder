import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Home from './components/Home';
import UserDashboard from './components/userdashboard/UserDashboard';
import Favourites from './components/userdashboard/Favourites';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Verification from './components/Verification';
import AiBot from './components/AiBot';
import TrainedVideos from './components/TrainedVideos';
import CreateVideo from './components/CreateVideo';
import WriteText from './components/WriteText';
import AudioRecorder from './components/AudioRecorder';
import AudPreview from './components/AudPreview';
import AiGenerate from './components/AiGenerate';
import PreviewText from './components/PreviewText';
import SetupAi3 from './components/SetupAi3';
import SetupAi4 from './components/SetupAi4';
import ForgotPassword from './components/ForgotPassword';
import SetupAi2 from './components/SetupAi2';
import ResetPassword from './components/ResetPassword';
import Templates from './components/Templates';
import AiGenerate2 from './components/AiGenerate2';
import Compositions from './components/Compositions';
import AdminPanel from './components/partials/AdminPanel';
import TermsAndConditions from './components/partials/TermsAndConditions';
import Subscription from './components/userdashboard/Subscription';
import { VideoProvider } from './context/VideoContext';
import { ConsentProvider } from './context/ConsentContext';
import About from './components/partials/About';
import Contact from './components/partials/Contact';
import SubscriptionPlans from './components/SubscriptionPlans';
import VideoList from './components/VideoList';
import { BASE_URL } from './store.json';

const App = () => {
  return (
    
    
    <ConsentProvider>
      <AuthProvider>
        <VideoProvider>

          <div className='h-fit bg-gray-100 overflow-x-hidden overflow-y-hidden'>
            <Routes>
              <Route path={BASE_URL+"/login"} element={<Login />} />
              <Route path={BASE_URL+"/verification"} element={<Verification />} />
              <Route path={BASE_URL+'/register'} element={<CreateAccount />} />

              {/* Protected Routes */}
              <Route path={BASE_URL+"/"} element={<Home />} />
              <Route path={BASE_URL+"/userpanel"} element={<PrivateRoute><Subscription/></PrivateRoute>} />
              <Route path={BASE_URL+"/favourites"} element={<PrivateRoute><Favourites /></PrivateRoute>} />
              <Route path={BASE_URL+"/trainedvideos"} element={<TrainedVideos />} />
              <Route path={BASE_URL+"/videolist"} element={<PrivateRoute><VideoList /></PrivateRoute>} />
              <Route path={BASE_URL+"/templates"} element={<PrivateRoute><Templates /></PrivateRoute>} />
              <Route path={BASE_URL+"/create-video"} element={<PrivateRoute><CreateVideo /></PrivateRoute>} />
              <Route path={BASE_URL+"/writeText"} element={<PrivateRoute><WriteText /></PrivateRoute>} />
              <Route path={BASE_URL+"/audio-recording"} element={<PrivateRoute><AudioRecorder /></PrivateRoute>} />
              <Route path={BASE_URL+'/preview-audio'} element={<PrivateRoute><AudPreview /></PrivateRoute>} />
              <Route path={BASE_URL+'/preview-text'} element={<PrivateRoute><PreviewText /></PrivateRoute>} />
              <Route path={BASE_URL+'/AiGenerate1'} element={<PrivateRoute><AiGenerate /></PrivateRoute>} />
              <Route path={BASE_URL+'/AiGenerate2'} element={<PrivateRoute><AiGenerate2 /></PrivateRoute>} />
              <Route path={BASE_URL+"/Ai-Setup1"} element={<AiBot />} />
              <Route path={BASE_URL+"/Ai-Setup2"} element={<PrivateRoute><SetupAi2 /></PrivateRoute>} />
              <Route path={BASE_URL+"/Ai-Setup3"} element={<PrivateRoute><SetupAi3 /></PrivateRoute>} />
              <Route path={BASE_URL+'/terms-and-conditions'} element={<PrivateRoute><TermsAndConditions /></PrivateRoute>} />
              <Route path={BASE_URL+"/Ai-Setup4"} element={<PrivateRoute><SetupAi4 /></PrivateRoute>} />
              <Route path={BASE_URL+'/forgot-password'} element={<PrivateRoute><ForgotPassword /></PrivateRoute>} />
              <Route path={BASE_URL+'/reset-password'} element={<PrivateRoute><ResetPassword /></PrivateRoute>} />
              <Route path={BASE_URL+'/compositions'} element={<PrivateRoute><Compositions /></PrivateRoute>} />
              <Route path={BASE_URL+'/admin-panel'} element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
              <Route path={BASE_URL+'/subscription'} element={<PrivateRoute><Subscription /></PrivateRoute>} />
              <Route path={BASE_URL+'/renew-subscription'} element={<PrivateRoute><SubscriptionPlans/></PrivateRoute>} />
              <Route path={BASE_URL+"/trainedvideos"} element={<PrivateRoute><TrainedVideos/></PrivateRoute>} />
              <Route path={BASE_URL+"/about"} element={<About/>} />
              <Route path={BASE_URL+"/contact"} element={<Contact/>} />
              
              

            </Routes>
          </div>
        </VideoProvider>
      </AuthProvider>
    </ConsentProvider>
  );
};


export default App;
