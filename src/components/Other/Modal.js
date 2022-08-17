import {useContext} from 'react'
import {User} from '../../App'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import '../../styles/modal.css'
export default function Modal(){
    const context = useContext(User)
    const navigate = useNavigate()

    const deleteTopic = (e)=>{
        e.preventDefault()
        axios.delete(`http://localhost:4000/topic/${context.modal[2]}`).then(data=>{
            console.log(data)
            navigate('/')
            context.setModal([false])
        }).catch(err=>{
            console.log(err)
        })
    }


    return(
        <div className="modal">
        {
        context.modal[1] == "delete"?
        <div className="modal-info">
            <div className="modal-top">
                Supprimer ce topic
                <div 
                onClick={()=>{context.setModal(false)}}
                className="modal-top-right">
                    FERMER
                </div>
            </div>
            <div className="modal-body">
                <div className="modal-content">
                <p>Etes vous sur de vouloir <span className="supprimer">supprimer</span> ce topic ?</p>
                <button className="modal-btn" onClick={deleteTopic}>SUPPRIMER</button>
                </div>
            </div>
        </div>
        :null
        }
    </div>
    )
}