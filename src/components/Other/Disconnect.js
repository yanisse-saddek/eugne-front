
import {useNavigate} from 'react-router-dom'
import {useEffect, useContext} from 'react'
import {User} from '../../App'
import axios from 'axios'

export default function Disconnect(){
    const context = useContext(User)
    let navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:4000/login/disconnect').then(data=>{
            console.log(data)
            window.localStorage.removeItem('token')
            navigate('/')
            context.logUser({}, false)
        })
    },  [])

}