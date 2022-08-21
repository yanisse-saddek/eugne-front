import { NavLink } from "react-router-dom"
import {useContext, useEffect, useState} from 'react'
import {User} from '../../App'

export default  function LoggedNavbar(props){
    const context = useContext(User)
    const [info, setInfo] = useState({})
    useEffect(()=>{
        setInfo(context.user)
    }, [context.user])
    return(
        <>
        <div className="navbar-left">
                <NavLink to="/">FORUM</NavLink>
                <NavLink className="disconnect" to="/disconnect">DECONNEXION</NavLink>
            </div>
            <div className="navbar-right">
                <NavLink to={'/user/'+props.user.username}>{props.user.username}</NavLink>
                <img className="profil-picture" src={props.user.profile_picture} />
            </div>
        </>
    )
}