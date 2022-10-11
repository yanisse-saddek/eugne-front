import { useContext } from "react"
import {User} from '../../App'
import {NavLink} from 'react-router-dom'
import Message from './Message'

export default function TopicHeader(props){
    const context = useContext(User)
    return(
        <>
        <div className="topic-top">
            <div className="topic-top-left">
                <p>{props.topic.title}</p>
                <NavLink to={'/user/'+props.topic.created_by._id}>De: {props.topic.created_by.username}</NavLink>
            </div>
            {
                context.user._id === props.topic.created_by._id?
                <div className="topic-top-right">
                    <button className="btn resolved">RESOLU?</button>
                    <button onClick={()=>{context.setModal([true, 'edit', props.topic])}} className="btn edit">MODIFIER</button>
                    <button onClick={()=>{context.setModal([true, 'delete', props.params])}} className="btn delete" >SUPPRIMER</button>
                </div>
            :null
        }

        </div>
        <Message message={props.topic} />
        </>
    )
}