import {useContext, useEffect} from 'react'
import axios from 'axios'
import {User} from '../../App'

export default function AutoLogin(){
    const context = useContext(User)
    useEffect(()=>{
        log()
    }, [])
    const log = ()=>{
        console.log(' c appeleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        const info = {mail:" ",password:" "}
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/login/token/${window.localStorage.getItem('token')}`, info).then(data=>{
            context.logUser(data.data, true)
            // console.log('c CONECTER!')
            // console.log(data.data)
    
        }).catch(err => {
            console.log('PAS CONNECTER!!!!!!!!!!!!!!!!!!!', window.localStorage.getItem('token'))
            if(window.localStorage('isLoggedIn')){
                log()
            }
            console.log(err)
            context.logUser({}, false)
        }); 
        console.log('ok')
    }

  }

  module.export = AutoLogin