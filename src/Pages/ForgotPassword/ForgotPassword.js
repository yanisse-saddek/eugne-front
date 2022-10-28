import {useState} from 'react'
import axios from 'axios'
export default function ForgotPassword(){
    const [mail, setMail] = useState('')
    const [message, setMessage] = useState([])

    const sendForm = (e)=>{
        e.preventDefault()
        const info = {mail:mail}

        axios.post('http://localhost:4000/password/forgot', info).then(data=>{
        console.log(data)
        setMessage([true, "Vous avez reçu un email avec un lien de reintialisation", true])
        }).catch(err=>{
            console.log(err)
        setMessage([true, "L'email n'existe pas", false])
        })
    }
    return(
        <div className="login">
        <div className="login-form">
            <div className="login-header">
                <p>MOT DE PASSE OUBLIE</p>
            </div>
            <div className="login-body">
                <input type="text" placeholder="Adresse e-mail" onChange={(e)=>{setMail(e.target.value)}}/>
                <div className="error-container">
                {
                            message[0]?
                            <div className={message[2]?"error-message success ":"error-message failed"}>{message[1]}</div>
                            :
                            null
                }
                </div>
                <button onClick={sendForm}>ENVOYER</button>
            </div>
        </div>
    </div>
    )
}