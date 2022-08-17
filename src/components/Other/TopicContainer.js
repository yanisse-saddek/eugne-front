import '../../styles/topiccontainer.css'
export default function TopicContainer(props){
    const getDate = (d)=>{
        const date = new Date(d)
        const todayDate = new Date()
        console.log(todayDate.getDate(), date.getDate())
        if(todayDate.getDate() === date.getDate()){
            return date.toLocaleTimeString("fr-FR")
        }else{
            return date.toLocaleDateString("fr-FR")
        }      
    }
    return(
        <div className="topic-bar message">
            {props.profile?
            <p className="author">{props.topic.subject}</p>
            :
            <p className="author">{props.topic.created_by.username}</p>
            }
            <p className="subject">{props.topic.title}</p>
            <p className="last-msg">{getDate(props.topic.updated_at)}</p>
            <p className="number-msg">{props.topic.replies}</p>
        </div>
    )
}