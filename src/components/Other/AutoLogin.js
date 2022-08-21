import {useContext, useEffect} from 'react'
import axios from 'axios'
import {User} from '../../App'

export default function AutoLogin(){
    const context = useContext(User)
    useEffect(()=>{
        log()
        console.log('composin')
    }, [])
    const log = ()=>{
        const info = {mail:" ",password:" "}
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/login/token/${window.localStorage.getItem('token')}`, info).then(data=>{
            context.logUser(data.data, true)  
            axios.get('http://localhost:4000/test').then(ok=>{
                console.table(ok.data)
                if(window.localStorage.getItem('isLoggedIn') && !ok.data){
                    console.log('ca redo')
                    log()
                    context.logUser(data.data, true)  
                }
            })  
        }).catch(err => {
            console.log('erreur')
           console.log(err)
           console.log('erreur')
        }); 
    }

  }

  module.export = AutoLogin