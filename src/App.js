import {createContext, useEffect, useState} from 'react'
import {Routes,Route} from "react-router-dom"
import axios from 'axios'

import { Login, Register, Forum, Confirm, NewTopic, Topic, ForgotPassword, ResetPassword, Profile, Admin } from "./Pages";

import "./styles/prism.css";
import "./styles/main.css"
import "./styles/topiccontainer.css"

import Disconnect from "./components/Other/Disconnect"
import ImageUploader from "./components/modals/ImageUploader"
import PPModal from "./components/modals/PPModal"
import Modal from "./components/Other/Modal"
import Navbar from './components/Navbar/Navbar'

export const User = createContext();
function App() {
  const [log, setLog] = useState(false)
  const [user, setUser] = useState({})
  const [modal, setModal] = useState([false])
  const [textEditor, setTextEditor] = useState("")
  const [visibility, setVisibility] = useState(true)

  useEffect(()=>{
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:4000/login/reconnect').then(data=>{
      if(data.data){
        setLog(true)
        setUser(data.data)
      }
    }).catch(err => {
      console.log(err)
    }); 
  }, [])
  
  const logUser = (data, state) => {
    setLog(state)
    setUser(data)
  }
  
  const changeContext = {logUser,log,user, setTextEditor, textEditor, setModal, modal}
  return (
    <div className="App">
    <User.Provider value={changeContext}>
      {modal[0]?<Modal /> : null}
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
      <Route path="/user/:id" element={<Profile/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
    </User.Provider>
    </div>
  );
}

export default App;
