import { NavLink } from 'react-router-dom'
import '../../styles/Navbar.css';
import {useContext} from 'react'
import { User } from '../../App'
import LoggedNavbar from './LoggedNavbar'
import DisconnectedNavbar from './DisconnectedNavbar'

export default function Navbar(){
    const context = useContext(User)
    
    return(
        <div className="navbar">
            {
            context.log?
            <>
            <LoggedNavbar/>
            </>:
            <DisconnectedNavbar />
            }
        </div>
    )
}