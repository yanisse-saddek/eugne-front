import {useState, useEffect, useContext} from 'react'
import '../../styles/Topic.css'
import { Editor } from '@tinymce/tinymce-react';
import { Link, useParams, NavLink} from 'react-router-dom';
import axios from 'axios';
import {Markup} from 'interweave'
import {User} from '../../App'
import EditorC from '../Other/Editor'

export default function Topic(){
    const params = useParams()
    const [text, setText] = useState('')
    const [topic, setTopic] = useState(false)
    const context = useContext(User)

    useEffect(()=>{
        getTopicData()
    }, [context.modal])

    const getTopicData = ()=>{
        axios.get(`http://localhost:4000/topic/${params.id}`).then(data=>{
            setTopic(data.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const sendMessage = (e)=>{
        e.preventDefault()
        const message = {
            content:context.textEditor,
        }   

        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/topic/answer/${params.id}`, message).then(data=>{
            getTopicData()
            context.setTextEditor('')
        }).catch(err=>{
            if(window.localStorage.getItem('isLoggedIn')){
                context.reLogUser()
            }
        })
    }
    const getDate = (d)=>{
        const date = new Date(d)
            return date.toLocaleDateString("fr-FR") +" "+ date.toLocaleTimeString("fr-FR")
    }

    return(
        <div className="topic topic-page">

            <div className="topic-main">
                <button className="return-btn"><Link to="/">RETOUR</Link></button>
                {
                    topic?
                    <>
                    <div className="topic-top">
                    <div className="topic-top-left">
                        <p>{topic.title}</p>
                        <NavLink to={'/user/'+topic.created_by._id}>De: {topic.created_by.username}</NavLink>
                    </div>
                    {
                        context.user._id === topic.created_by._id?
                    <div className="topic-top-right">
                    <button className="btn resolved">RESOLU?</button>
                    <button onClick={()=>{context.setModal([true, 'edit', topic])}} className="btn edit">MODIFIER</button>
                    <button onClick={()=>{context.setModal([true, 'delete', params.id])}} className="btn delete" >SUPPRIMER</button>
                    </div>
                        :null
                    }
                </div>
                <div className="topic-main-messages">
                    <div className="message">
                        <NavLink to={'/user/'+topic.created_by.username}>
                        <div className="message-top">
                        <div className='message-top-left'>
                            <img className="profile-picture" src={topic.created_by.profile_picture} />
                            <div className="message-top-right">
                                <p className="name">{topic.created_by.username}</p>
                                <p className="date">{getDate(topic.updated_at)}</p>
                            </div>
                            </div>
                            </div>
                        </NavLink>
                        <div className="message-body">
                            <Markup content={topic.content}/>
                        </div>
                        <div className="message-footer">
                            <p>Je suis interessé par le developpement web depuis très longtemps, c’est pour quoi j’ai rejoind ce forum</p>
                        </div>
                    </div>
                    {
                        topic.messages.map((message, index)=>{
                            return(
                                <div key={index} className="message">
                                <div className="message-top">
                                    <div className='message-top-left'>
                                    <img className="profile-picture" src={message.created_by.profile_picture}/>
                                    <div className="message-top-right">
                                        <p className="name">{message.created_by.username}</p>
                                        <p className="date">{message.created_at}</p>
                                    </div>
                                    </div>
                                    {message.created_by._id == context.user._id?
                                    <div onClick={()=>{context.setModal([true, 'delete-msg', message])}} className="delete-btn">x</div>
                                    :context.user._id && !message.reported?
                                    <svg onClick={()=>{context.setModal([true, 'report-msg', message])}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#FC4E4E" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/>
                                    </svg>
                                    :null
                                    }
                                </div>
                                <div className="message-body">
                                    <Markup content={message.content}/>
                                </div>
                                <div className="message-footer">
                                    <p>Je suis interessé par le developpement web depuis très longtemps, c’est pour quoi j’ai rejoind ce forum</p>
                                </div>
                            </div>
                            )
                        })
                    }

                    <div className="separator">Poster un message</div>
                    <div className="button-right">  
                        <button onClick={()=>{context.setModal([true, 'uploader'])}}>Publier une nouvelle image</button>
                    </div>
                        <EditorC />

                    <div className="page-bottom">
                        <button onClick={sendMessage} className="send-message">ENVOYER</button>
                    </div>
                </div>
                </>
                :null
                }
            </div>
        </div>
    )
}