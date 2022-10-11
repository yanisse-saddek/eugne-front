import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Forum from './Pages/Forum'
import Confirm from './Pages/Confirm'
import NewTopic from './Pages/NewTopic'
import Topic from './Pages/Topic'
import AutoLogin from './components/Other/AutoLogin'

import "./styles/prism.css";
import "./styles/main.css"
import "./styles/topiccontainer.css"

import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import Disconnect from "./components/Other/Disconnect"
import ImageUploader from "./components/modals/ImageUploader"
import PPModal from "./components/modals/PPModal"
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword"
import UserProfile from "./Pages/UserProfile"
import Admin from "./Pages/Admin"
import Modal from "./components/Other/Modal"

export const User = createContext();
function App() {
  const [log, setLog] = useState(false)
  const [user, setUser] = useState({})
  const [autoLog, setAutoLog] = useState(false)
  const [modal, setModal] = useState([false])
  const [textEditor, setTextEditor] = useState("")
  const [visibility, setVisibility] = useState(true)

  const logUser = (data, state) => {
    setLog(state)
    setUser(data)
  }

  const reLogUser = ()=>{
    setAutoLog(true)
    setTimeout(()=>{
      setAutoLog(false)
    }, 1000)
  }
  const changeContext = {logUser,log,user, setTextEditor, textEditor, 
    reLogUser, setModal, modal
  }


  return (
    <div className="App">
    <User.Provider value={changeContext}>
      {modal[0]?<Modal /> : null}
      {autoLog?<AutoLogin />:null}

      <AutoLogin />
      <Navbar />
    <Routes>
      <Route path="/">
        <Route index element={<Forum />} />
        <Route path=":page" element={<Forum />} />
      </Route>

      <Route path="/topic/:id/:page" element={<Topic/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/new-topic" element={<NewTopic/>} />
      <Route path="/confirm/:code" element={<Confirm/>} />
      <Route path="/disconnect" element={<Disconnect/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password/:token" element={<ResetPassword/>} />
      <Route path="/user/:id" element={<UserProfile/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
    </User.Provider>
    </div>
  );
}

export default App;
