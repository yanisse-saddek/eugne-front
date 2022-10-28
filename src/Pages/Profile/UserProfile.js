import './profile.css'
import TopicContainer from '../../components/Other/TopicContainer'
import {useContext, useEffect,useState} from 'react'
import {User} from '../../App'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function Profile(){
    const context = useContext(User)
    const params = useParams()
    const [user, setUser] = useState(false)

    useEffect(()=>{
        loadData()
    }, [context.user])

    const loadData = ()=>{
        axios.get(`http://localhost:4000/user/${params.id}`).then(data=>{
            setUser(data.data)
        }).catch(err=>{
            console.log(err)
        })
    }


    const getDate = (d)=>{
        const date = new Date(d)
        const todayDate = new Date()
            if(todayDate.getDate() === date.getDate()){
            return date.toLocaleTimeString("fr-FR")
        }else{
            return date.toLocaleDateString("fr-FR")
        }      
    }

    return(
        <div className="profile-page">
            {
                user?
            <div className="profile">
                <div className="profile-left">
                    <div className="profile-left-top">
                    <img className="image-profile" src={user.profile_picture} />
                    <button className="profile-btn" onClick={()=>{context.setModal([true, 'profile-picture'])}}  >MODIFIER</button>
                    </div>

                    <div className="profile-left-bottom">
                        <p className="username">{user.username}</p>
                        <p className="mail">{user.mail}</p>
                        <p className="registered_at">Inscrit le {getDate(user.registered_at)}</p>
                    </div>
                </div>
                <div className="profile-right">
                        <p className="profile-right-title">Dernier topics de {user.username}</p>
                         {
                            user.topics.map((topic, index)=>{
                                return(
                                <Link key={index} className="topic-link" to={`/topic/${topic._id}`}>
                                    <TopicContainer topic={topic} profile={true} />
                                </Link>
                                )
                            })
                        } 
                    </div>
            </div>
               :
               <div className="confirm-message">
               <p className="msg failed">
                    Profil inconnu
               </p>
               </div>
            }
        </div>
    )
}