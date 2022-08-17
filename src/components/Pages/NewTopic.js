import {Link} from 'react-router-dom'
import {useState, useContext} from 'react'
import { User } from '../../App'
import '../../styles/NewTopic.css'
import axios from 'axios'
import Editor from '../Other/Editor'
import Select from '../Other/Select'
import {useNavigate} from 'react-router-dom'
export default function NewTopic(){
    const context = useContext(User)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [text, setText] = useState('')
    const navigate = useNavigate()

    const sendTopic = (e)=>{
        e.preventDefault()
        const newTopic = {
            title:title,
            content:context.textEditor,
            subject:type
        }
       
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:4000/topic/', newTopic).then(data=>{
            console.log(data)
            navigate(`/topic/${data.data.id}`)
            context.setTextEditor('')
        }).catch(err=>{
            console.log(err)
        })
    }


    return(
        <div className="topic-page">
        <div className="new-topic-main">
            <div className="new-topic-form">
            <Link to="/" className="return-btn">RETOUR</Link>
                <div className="new-topic-top">
                    Nouveau Topic
                </div>
                
                <div className="new-topic-body">
                <div className="button-right">
                    <button onClick={()=>{context.setUploader(true)}}>Publier une nouvelle image</button>
                </div>
                    <p>Titre du topic</p>
                    <input type="text" className="title-input" onChange={(e)=>{setTitle(e.target.value)}}/>
                    <Editor />
                    <div className="new-topic-footer">
                    <Select setType={setType} />
                    <button onClick={sendTopic} className="publish-topic">ENVOYER</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}