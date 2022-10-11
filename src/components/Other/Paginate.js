import { useNavigate } from "react-router-dom"
export default function Paginate(props){
    const navigate = useNavigate()
    
    const loadPage = (e, load, restart)=>{
        e.preventDefault()
        if(restart){
            props.setCount([0, 10])
            props.newData(0, 10)
            // navigate(`/topic/${props.link}/1`)
        }else{
            var newTopicsL = []
            if(load){
                navigate(`${props.link}/${parseInt(props.page)+1}`)
                newTopicsL = [props.topicCount[0]+props.step, props.step]
            }else{
                navigate(`${props.link}/${parseInt(props.page)-1}`)
                newTopicsL = [props.topicCount[0]-props.step,props.step]
            }
            props.setCount(newTopicsL)
            props.newData(newTopicsL[0], newTopicsL[1])
        }
    }
    return(
        <div className="pagination">
                    {
                    props.topicCount[0]>0?
                        <div className="pagination-left">
                        <button  onClick={(e)=>{loadPage(e,false, true)}}>
                            <svg className="icon" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z"/>
                            </svg>
                        </button> 
                        <button onClick={(e)=>{loadPage(e,false)}}>
                            <svg className="icon" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                <path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z"/>
                            </svg>
                        </button>
                        </div>:
                        null
                    }
                    {
                    props.count > props.topicCount[0]+props.step?
                        <button onClick={(e)=>{loadPage(e,true)}}>
                            <svg className="icon" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                <path d="M118.6 105.4l128 127.1C252.9 239.6 256 247.8 256 255.1s-3.125 16.38-9.375 22.63l-128 127.1c-9.156 9.156-22.91 11.9-34.88 6.943S64 396.9 64 383.1V128c0-12.94 7.781-24.62 19.75-29.58S109.5 96.23 118.6 105.4z"/>
                            </svg>
                        </button>
                    :null
                    }
        </div>
    )
}