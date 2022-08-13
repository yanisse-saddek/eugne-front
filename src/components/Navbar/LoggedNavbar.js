import { NavLink } from "react-router-dom"

export default  function LoggedNavbar(props){
    return(
        <>
        <div className="navbar-left">
                <NavLink to="/">FORUM</NavLink>
                <NavLink className="disconnect" to="/disconnect">DECONNEXION</NavLink>
            </div>
            <div className="navbar-right">
                <NavLink to="/profile">{props.user.username}</NavLink>
                <img className="profil-picture" src="https://static.comment-economiser.fr/images/photos_astuces/proprietaire-caht-5236.jpg" />
            </div>
        </>
    )
}