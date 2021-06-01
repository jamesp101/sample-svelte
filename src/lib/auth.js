
import axios from 'axios'
import { writable } from 'svelte/store';
import {session} from '$app/stores'
import { goto } from '$app/navigation';



export let host = 'http://localhost:8080'


export async function login (identifier, password){
    try{
        let response = await axios.post(host+'/auth/local',
        {
            identifier: identifier,
            password:   password
        })

        // { 
        //   config: {},
        //   data: { jwt: ...., userinfo }
        // }

        localStorage.token = response.data.jwt
        localStorage.user = response.data.id


        goto('/')

    }catch{
        alert ("User not found")
    }
}

export async function logout (){
    localStorage.token = null
    localStorage.user  = null
}
