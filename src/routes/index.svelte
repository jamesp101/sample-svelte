<script>
    import { onMount } from 'svelte';
    import axios from 'axios'
    import '../style.css'
    import {host, logout} from '$lib/auth'

    import TodoItem from  '$lib/components/TodoItem.svelte'
    import { destroy_block } from 'svelte/internal';

    import { goto } from '$app/navigation';

    let todos = []

    let addTodo = ''


    onMount( async ()=>{
        console.log(localStorage.token)
        getTodos()


        if (localStorage.token == null ||
            localStorage.token == undefined)
            {
                goto('/login')
            }

    })

    function onLogout(){
        logout();
        goto('/login')
    }




    async function getTodos() {
        let response = await axios.get(host+'/todos',
            {
                headers: {
                    "Authorization" : "Bearer " + localStorage.token
                }
            })

        todos = response.data
        
        console.log(response)
    }
    
    async function onAddTodo(){
        let response = await axios.post(host+'/todos',
        {
            "description":addTodo ,
                "user": [ localStorage.user ],
        },

        {
            headers: {
                "Authorization" : "Bearer " + localStorage.token
            }
        })

        getTodos()
    }

</script>



<button on:click={onLogout}>Logout</button>


<div class="addForm">
    <div>
        <label for="">Add todo</label>
        <input type="text" class="input" bind:value={addTodo}/>
        <button on:click={onAddTodo}> Add Todo</button>
    </div>
</div>


{#each todos as todo}
<TodoItem
    id={todo.id}
    description={todo.description}
    email={todo.user[0]?.email || ''}
    submitted= {todo.published_at}

    on:itemDeleted={getTodos}
    on:itemUpdated={getTodos}
></TodoItem>

{/each}

<style>
    .addForm{
        display: grid;
        justify-items: center;
        padding: 5rem;
    }

    .input{
        padding: 1rem;
        
    }

</style>