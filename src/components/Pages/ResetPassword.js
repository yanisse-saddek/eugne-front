import {useState} from 'react'
import { useParams } from 'react-router-dom' 
import axios from 'axios'

export default function ResetPassword(){
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [message, setMessage] = useState([])
    const params = useParams() 
    console.log(params)

    const sendForm = (e)=>{
        e.preventDefault()
        if(pass1 !== pass2){
            setMessage([true, "Les mots de passe ne correspondent pas", false])
        }else{
            const info = {password:pass1}
            console.log(params)
            axios.post(`http://localhost:4000/password/forgot/${params.token}`, info).then(data=>{
                console.log(data)
                setMessage([true, "Votre mot de passe a été changé", true])
            }).catch(err=>{
                console.log(err)
                setMessage([true, "Le lien est incorrect ou à expiré", false])
            })
        }
    }
    return(
        <div className="login">
        <div className="login-form">
            <div className="login-header">
                <p>MOT DE PASSE OUBLIE</p>
            </div>
            <div className="login-body">
                <input type="password" placeholder="Mot de passe" onChange={(e)=>{setPass1(e.target.value)}}/>
                <input type="password" placeholder="Confirmer le mot de passe" onChange={(e)=>{setPass2(e.target.value)}}/>
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