import {useState, useEffect, useContext} from 'react'
import '../styles/Topic.css'
import { Editor } from '@tinymce/tinymce-react';
import { Link, useParams, NavLink} from 'react-router-dom';
import axios from 'axios';
import {Markup} from 'interweave'
import {User} from '../App'
import EditorC from '../components/Other/Editor'
import Paginate from '../components/Other/Paginate';
import TopicHeader from '../components/Other/TopicHeader';
import Message from '../components/Other/Message';

export default function Topic(){
    const params = useParams()
    const [text, setText] = useState('')
    const [topic, setTopic] = useState(false)
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState([])
    const [messageCount, setMessageCount] = useState([(params.page-1)*10, 10])
    const context = useContext(User)

    useEffect(()=>{
        getTopicData(messageCount[0], messageCount[1])
    }, [context.modal])

    const getTopicData = (min, max)=>{
        const url = `http://localhost:4000/topic/${params.id}/${min}/${max}`
        axios.get(url).then(data=>{
            setTopic(data.data)
            setCount(data.data.replies)
        }).catch(err=>{
            console.log(err)
        })
    }

    const sendMessage = (e)=>{
        if(e){
            e.preventDefault()
        }

        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/topic/answer/${params.id}`, {content:context.textEditor}).then(data=>{
            getTopicData(messageCount[0], messageCount[1])
            context.setTextEditor('')
        }).catch(err=>{
            console.log(err)
            setMessage([true, "Veuillez vous connecter pour poster un message"])
        })
    }


    return(
        <div className="topic topic-page">
            <div className="topic-main">
            <button onClick={sendMessage} className="send-message">ENVOYER</button>

                <button className="return-btn"><Link to="/">RETOUR</Link></button>
                <Paginate link={`/topic/${params.id}`} page={params.page} count={count} topicCount={messageCount} newData={getTopicData} setCount={setMessageCount} step={10} />
                {topic?
                    <>
                        {messageCount[0]!==1? <TopicHeader topic={topic} params={params.id}/>:null}
                        {topic.messages.map(message=> <Message message={message} /> )}
                    </>
                :null}
                
                    <div className="separator">Poster un message</div>
                        <div className="button-right">  
                            <button onClick={()=>{context.setModal([true, 'uploader'])}}>Publier une nouvelle image</button>
                        </div>
                            {message[0]?
                                <div className="error-message failed">{message[1]}</div>
                            :null}
                            <EditorC />
                        <div className="page-bottom">
                            <button onClick={sendMessage} className="send-message">ENVOYER</button>
                        </div>
                    <Paginate count={count} topicCount={messageCount} newData={getTopicData} setCount={setMessageCount} step={10} />
            </div>
        </div>
    )
}