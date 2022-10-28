import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import './confirm.css'
export default function Confirm(){
    const params = useParams();
    const [message, setMessage] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/mail/confirm/${params.code}`).then(res => {
            // Work with the response...
            setMessage([true, 'Votre mail a bien été confirmé !'])
            console.log(res)
        }).catch(err => {
            setMessage([false, 'Une erreur est survenue.'])
            console.log(err);
        });
    }, [])
    return(
        <div className="confirm-message">
        <div className={ message[0]?"msg success":"msg failed"}>
            {message[1]}
        </div>
        </div>
    )
}