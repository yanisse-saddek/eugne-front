import { NavLink } from "react-router-dom"
export default  function LoggedNavbar(){
    return(
        <>
            <NavLink to="/">FORUM</NavLink>
            <div className="navbar-right">
                    <NavLink to="/login">CONNEXION</NavLink>
                    <NavLink to="/register">INSCRIPTION</NavLink>
            </div>
            </>
    )
}