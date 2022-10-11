import "../styles/Forum.css"
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { User } from '../App'
import TopicContainer from '../components/Other/TopicContainer'
import Select from '../components/Other/Select'
import Paginate from '../components/Other/Paginate'
import { useParams } from "react-router-dom"

export default function Forum(){
    const context = useContext(User)
    const [topicsList, setTopicsList] = useState([])
    const [topicCount, setTopicCount] = useState([0, 10])
    const [count, setCount] = useState(0)
    const params = useParams()

    useEffect(()=>{
        newTopics(0, 10)
    }, [])

    const searchSubject = (e)=>{
        axios.get(`http://localhost:4000/topic/subject/${e}`).then(data=>{
            setTopicsList(data.data)
        })
    }
    
    const newTopics = (min, max)=>{
        const url = `http://localhost:4000/topic/${min}/${max} `
        axios.get(url).then(data=>{
            setTopicsList(data.data.topics)
            setCount(data.data.count)
        })
    }

    return(
        <div className="forum">
            <div className="forum-main">
            <div className="top-buttons">
                <Link to="/new-topic" className="new-topic">NOUVEAU TOPIC</Link>
                <div className="button-right">
                    <input type="text" placeholder="Rechercher un topic, un sujet..." />
                    <Select setType={searchSubject} />
                </div>
            </div>
            <div className="topic-list">
            <Paginate link={'/'} page={params.page?params.page:0}  count={count} topicCount={topicCount} newData={newTopics} setCount={setTopicCount} step={10}/>
                <div className="topic-info">
                    <p className="author">Auteur</p>
                    <p className="subject">Sujet</p>
                    <p className="last-msg">Dernier message</p>
                    <p className="number-msg">NB</p>
                </div>
                {
                    topicsList.map((topic, index)=>{
                        return(
                        <Link key={index} className="topic-link" to={`/topic/${topic._id}/1`}>
                            <TopicContainer topic={topic} />
                        </Link>
                        )
                    })
                }

                <Paginate count={count} topicCount={topicCount} newData={newTopics} setCount={setTopicCount} step={10} />
            </div>
        </div>
    </div>
    )
}