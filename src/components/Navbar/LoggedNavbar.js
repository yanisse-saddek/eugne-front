import { NavLink } from "react-router-dom"
import {useContext, useEffect, useState} from 'react'
import {User} from '../../App'

export default  function LoggedNavbar(props){
    const context = useContext(User)
    useEffect(()=>{
        console.log('ca eugne la pdp')
    }, [context.user])
    return(
        <>
        <div className="navbar-left">
                <NavLink to="/">FORUM</NavLink>
                <NavLink className="disconnect" to="/disconnect">DECONNEXION</NavLink>
            </div>
            <div className="navbar-right">
                <NavLink to={'/user/'+context.user.username}>{context.user.username}</NavLink>
                <img className="profil-picture" src={context.user.profile_picture} />
            </div>
        </>
    )
}