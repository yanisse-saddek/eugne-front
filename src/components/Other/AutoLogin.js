import {useContext, useEffect} from 'react'
import axios from 'axios'
import {User} from '../../App'

export default function AutoLogin(){
    const context = useContext(User)
    useEffect(()=>{
        log()
    }, [])
    const log = ()=>{
        const info = {mail:" ",password:" "}
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/login/token/${window.localStorage.getItem('token')}`, info).then(data=>{
            context.logUser(data.data, true)  
            console.log(data)
            window.localStorage.setItem('token', data.data.token)
        }).catch(err => {
            console.log('erreur')
           console.log(err)
           console.log('erreur')
        }); 
    }

  }

  module.export = AutoLogin