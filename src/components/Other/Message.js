import { Markup } from "interweave"
import {useContext} from 'react'
import {User} from '../../App'

export default function Message(props){
    const context = useContext(User)
    const getDate = (d)=>{
        const date = new Date(d)
            return date.toLocaleDateString("fr-FR") +" "+ date.toLocaleTimeString("fr-FR")
    }
    return(
        <div className="message">
            <div className="message-top">
                <div className='message-top-left'>
                    <img className="profile-picture" src={props.message.created_by.profile_picture}/>
                    <div className="message-top-right">
                        <p className="name">{props.message.created_by.username}</p>
                        <p className="date">{getDate(props.message.created_at)}</p>
                    </div>
                </div>
            <div className="topic-btn-top">
                <div className="reply-btn" 
                    onClick={()=>{context.setTextEditor(
                        context.textEditor+ `
                            <blockquote style="margin-left:30px"> 
                                <p>${props.message.created_by.username} ${getDate(props.message.created_at)}</p>
                                ${props.message.content}
                            </blockquote>
                            `)}}>"
                </div>
        
                {props.message.created_by._id == context.user._id?
                    <div onClick={()=>{context.setModal([true, 'delete-msg', props.message])}} className="delete-btn">x</div>
                :context.user._id && !props.message.reported?
                        <svg onClick={()=>{context.setModal([true, 'report-msg', props.message])}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#FC4E4E" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
                        </svg>
                :null
                }
            </div>
            </div>
            <div className="message-body">
                <Markup content={props.message.content}/>
            </div>
            <div className="message-footer">
                <p>Je suis interessé par le developpement web depuis très longtemps, c’est pour quoi j’ai rejoind ce forum</p>
            </div>
         </div>
    )
}