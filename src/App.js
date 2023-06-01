import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ShowUserData from './Components/UserData/ShowUserData'
import NewUserData from './Components/UserData/NewUserData';
import EditUserData from './Components/UserData/EditUserData';
import ShowPostData from './Components/PostData/ShowPostData';
import NewPostData from './Components/PostData/NewPostData';
import EditPostData from './Components/PostData/EditPostData';
import ViewOwnerPostData from './Components/PostData/ViewOwnerPostData';

function App() {
  return (
    <>
      <BrowserRouter>
        <HomePage />
        <Routes>
          <Route path='/userdata' element={<ShowUserData />} />
          <Route path='/newuserdata' element={<NewUserData />} />
          <Route path='/edituserdata/:id' element={<EditUserData />} />
          <Route path='/postdata' element={<ShowPostData />} />
          <Route path='/newpostdata' element={<NewPostData />} />
          <Route path='/editpostdata/:id' element={<EditPostData />} />
          <Route path='/viewownerpostdata/:id' element={<ViewOwnerPostData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
