import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import Forum from './components/Pages/Forum'
import Confirm from './components/Pages/Confirm'
import NewTopic from './components/Pages/NewTopic'
import Topic from './components/Pages/Topic'
import AutoLogin from './components/Other/AutoLogin'

import "./styles/prism.css";
import "./styles/main.css"
import "./styles/topiccontainer.css"

import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import Disconnect from "./components/Other/Disconnect"
import ImageUploader from "./components/modals/ImageUploader"
import PPModal from "./components/modals/PPModal"
import ForgotPassword from "./components/Pages/ForgotPassword"
import ResetPassword from "./components/Pages/ResetPassword"
import UserProfile from "./components/Pages/UserProfile"
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

  useEffect(()=>{
      reLogUser()
  }, [])
  
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
      <Route path="/" element={<Forum/>} />
      <Route path="/topic/:id" element={<Topic/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/new-topic" element={<NewTopic/>} />
      <Route path="/confirm/:code" element={<Confirm/>} />
      <Route path="/disconnect" element={<Disconnect/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password/:token" element={<ResetPassword/>} />
      <Route path="/user/:id" element={<UserProfile/>} />
    </Routes>
    </User.Provider>
    </div>
  );
}

export default App;
