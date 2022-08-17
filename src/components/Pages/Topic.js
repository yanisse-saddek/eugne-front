import {useState, useEffect, useContext} from 'react'
import '../../styles/Topic.css'
import { Editor } from '@tinymce/tinymce-react';
import { Link, useParams, NavLink} from 'react-router-dom';
import axios from 'axios';
import {Markup} from 'interweave'
import ImageUploader from '../Other/ImageUploader'
import {User} from '../../App'
import EditorC from '../Other/Editor'

export default function Topic(){
    const params = useParams()
    const [text, setText] = useState('')
    const [topic, setTopic] = useState(false)
    const context = useContext(User)

    useEffect(()=>{
        getTopicData()
    }, [])
    const getTopicData = ()=>{
        axios.get(`http://localhost:4000/topic/${params.id}`).then(data=>{
            setTopic(data.data)
            console.log(data.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    const sendMessage = (e)=>{
        {e?e.preventDefault():console.log('ok')}
        const message = {
            content:context.textEditor,
        }   

        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/topic/answer/${params.id}`, message).then(data=>{
            getTopicData()
            context.setTextEditor('')
        }).catch(err=>{
            if(window.localStorage.getItem('isLoggedIn')){
                // context.reLogUser()
                // console.log('ya une ereur')
                // sendMessage()    
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
                    <button className="btn edit">MODIFIER</button>
                    <button onClick={()=>{context.setModal([true, 'delete', params.id])}} className="btn delete" >SUPPRIMER</button>
                    </div>
                        :null
                    }
                </div>
                <div className="topic-main-messages">
                    <div className="message">
                        <NavLink to={'/user/'+topic.created_by.username}>
                        <div className="message-top">
                            <img className="profile-picture" src="https://static.comment-economiser.fr/images/photos_astuces/proprietaire-caht-5236.jpg"/>
                            <div className="message-top-right">
                                <p className="name">{topic.created_by.username}</p>
                                <p className="date">{getDate(topic.updated_at)}</p>
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
                                    <img className="profile-picture" src="https://static.comment-economiser.fr/images/photos_astuces/proprietaire-caht-5236.jpg"/>
                                    <div className="message-top-right">
                                        <p className="name">{message.created_by.username}</p>
                                        <p className="date">{message.created_at}</p>
                                    </div>
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
                        <button onClick={()=>{context.setUploader(true)}}>Publier une nouvelle image</button>
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