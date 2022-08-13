import {useState, useEffect} from 'react'
import '../../styles/Topic.css'
import { Editor } from '@tinymce/tinymce-react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {Markup} from 'interweave'
import ImageUploader from '../Other/ImageUploader'

export default function Topic(){
    const params = useParams()
    const [text, setText] = useState('')
    const [uploader, setUploader] = useState(false)
    const [topic, setTopic] = useState(false)
    useEffect(()=>{
        getTopicData()
    }, [])
    const getTopicData = ()=>{
        axios.get(`http://localhost:4000/topic/${params.id}`).then(data=>{
            setTopic(data.data)
        })
    }
    const sendMessage = (e)=>{
        e.preventDefault()
        const message = {
            content:text,
        }   
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/topic/answer/${params.id}`, message).then(data=>{
            getTopicData()
        })
    }
    const getDate = (d)=>{
        const date = new Date(d)
            return date.toLocaleDateString("fr-FR") +" "+ date.toLocaleTimeString("fr-FR")
    }
    return(
        <div className="topic topic-page">
            {
            uploader?
                <ImageUploader editText={setText} text={text} close={setUploader} />
            :null
            }
            <div className="topic-main">
                <button className="return-btn"><Link to="/">RETOUR</Link></button>
                {
                    topic?
                    <>
                    <div className="topic-top">
                    <div className="topic-top-left">
                        <p>{topic.title}</p>
                        <p>De: {topic.created_by.username}</p>
                    </div>
                    <div className="topic-top-right">
                    <button className="btn resolved">RESOLU?</button>
                    <button className="btn edit">MODIFIER</button>
                    <button className="btn delete">SUPPRIMER</button>
                    </div>
                </div>
                <div className="topic-main-messages">
                    <div className="message">
                        <div className="message-top">
                            <img className="profile-picture" src="https://static.comment-economiser.fr/images/photos_astuces/proprietaire-caht-5236.jpg"/>
                            <div className="message-top-right">
                                <p className="name">{topic.created_by.username}</p>
                                <p className="date">{getDate(topic.updated_at)}</p>
                            </div>
                        </div>
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
                        <button onClick={()=>{setUploader(true)}}>Publier une nouvelle image</button>
                    </div>
                    <Editor
                        apiKey='rhfovckwdqtgrkxuqum8cq629m2kvgdvcdbhw0ykhstkac56'
                        onEditorChange={(e)=>{setText(e)}}
                        value={text}
                        init={{
                        height: 350,
                        menubar: false,    
                        language: 'fr_FR',
                        object_resizing : false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'charmap',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 
                            'codesample', 'emoticons',
                        ],
                        toolbar: 'undo redo | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help'+ 'link | codesample | emoticons |    blockquote',
                        content_style: 'body { background:#F3F3F3; font-family:Helvetica,Arial,sans-serif; font-size:14px;} img{max-height:70px; max-width:70px}',
                        }}
                    />
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