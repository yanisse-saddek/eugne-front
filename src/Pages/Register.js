import '../styles/Login.css';
import {useState} from 'react'
import axios from 'axios'

export default function Register(){
    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState([])

    const registerMe = (e)=>{
        e.preventDefault()
        if(password != password2){
            setMessage([true, 'Les mots de passe ne correspondent pas', false])
        }else if(username, mail){
            const newUser = {
                username:username,
                mail:mail,
                password:password,
            }
            axios.post('http://localhost:4000/register', newUser).then(data=>{
                setMessage([true, data.data.message, true])
                console.log(data)
            }).catch(err => {
                if(err.response.status === 409 || 401){
                    console.log(err)
                    setMessage([true, err.response.data.message, false])
                }
            }); 
        }else{
            setMessage([true, 'Veuillez remplir tous les champs correctement', false])
        }
    }

    return(
        <div className="login">
            <div className="login-form">
                <div className="login-header">
                    <p>INSCRIPTION</p>
                </div>
                <div className="login-body">
                    <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="email" placeholder="Adresse e-mail" onChange={(e)=>{setMail(e.target.value)}} />
                    <div className="password-inputs">
                        <input type="password" placeholder="Mot de passe" onChange={(e)=>{ setPassword(e.target.value)}}/>
                        <input type="password" placeholder="Mot de passe" onChange={(e)=>{ setPassword2(e.target.value)}}/>
                    </div>
                    <div className="error-container">
                        {
                            message[0]?
                            <div className={message[2]?"error-message success ":"error-message failed"}>{message[1]}</div>
                            :
                            null
                        }
                    </div>
                    <button onClick={registerMe}>M'INSCRIRE</button>
                </div>
            </div>
        </div>
    )
}