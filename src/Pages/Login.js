import '../styles/Login.css';
import {useState} from 'react'
import axios from 'axios'
import {Navigate, NavLink} from 'react-router-dom'
import {useContext} from 'react'
import { User } from '../App'
import { useNavigate } from "react-router-dom";

export default function Login(){
    const context = useContext(User)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState([])
    let navigate = useNavigate();

    const login = (e)=>{
        e.preventDefault()
            const info = {
                mail:mail,
                password:password
            }
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:4000/login', info).then(data=>{
                context.logUser(data.data, true)
                window.localStorage.setItem('isLoggedIn', true)
                window.localStorage.setItem('token', data.data.token)
                navigate("/", { replace: true });
            }).catch(err => {
                console.log(err)
                setMessage([true, "Email ou mot de passe incorrect", false])
                window.localStorage.setItem('isLoggedIn', false)
            }); 
    }
    return(
        <div className="login">
            <div className="login-form">
                <div className="login-header">
                    <p>CONNEXION</p>
                </div>
                <div className="login-body">
                    <input type="text" placeholder="Adresse e-mail" onChange={(e)=>{setMail(e.target.value)}}/>
                    <input type="password" placeholder="Mot de passe" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <NavLink to="/forgot-password" className="forgot-password">J'ai oublié mon mot de passe</NavLink>
                    <div className="error-container">
                        {
                            message[0]?
                            <div className={message[2]?"error-message success ":"error-message failed"}>{message[1]}</div>
                            :
                            null
                        }
                    </div>
                    <button onClick={login}>ME CONNECTER</button>
                </div>
            </div>
        </div>
    )
}