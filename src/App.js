import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import Forum from './components/Pages/Forum'
import Confirm from './components/Pages/Confirm'
import Profile from './components/Pages/Profile'
import NewTopic from './components/Pages/NewTopic'
import Topic from './components/Pages/Topic'
import "./styles/main.css"
import "./styles/prism.css";

import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import Disconnect from "./components/Other/Disconnect"

export const User = createContext();
function App() {
  const [log, setLog] = useState(false)
  const [user, setUser] = useState()

  useEffect(()=>{
    autoLogin()
  }, [])

  const autoLogin = ()=>{
    const info = {mail:" ",password:" "}
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:4000/login/token/${window.localStorage.getItem('token')}`, info).then(data=>{
      logUser(data.data, true)
      console.log('c CONECTER!')
      console.log(data.data)
    }).catch(err => {
      console.log('PAS CONNECTER!!!!!!!!!!!!!!!!!!!', window.localStorage.getItem('token'))
        // console.log(err)
        logUser({}, false)
    }); 
  }

  const logUser = (data, state) => {
    setLog(state)
    setUser(data)
  }
  const changeContext = {
    logUser,
    log,
    user,
  }


  return (
    <div className="App">
    <User.Provider value={changeContext}>
      <Navbar />
    <Routes>
      <Route path="/" element={<Forum/>} />
      <Route path="/topic/:id" element={<Topic/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/new-topic" element={<NewTopic/>} />
      <Route path="/confirm/:code" element={<Confirm/>} />
      <Route path="/disconnect" element={<Disconnect/>} />
    </Routes>
    </User.Provider>
    </div>
  );
}

export default App;
