<script>
    import axios from 'axios'
    import {host} from '$lib/auth'

    import { createEventDispatcher } from 'svelte';

    export let id= '';
    export let description = '';
    export let email = '';
    export let submitted = '';

    const dispatch = createEventDispatcher()

    async function onDelete(){

        await axios.delete(host+'/todos/'+id,
            {
                headers: {
                    "Authorization" : "Bearer " + localStorage.token
                }
            })
        
        dispatch('itemDeleted')
        
    }

    async function onEdit(){
        await axios.put(host+'/todos/'+id,
            {
                description: prompt('Edit Todo')
            },
            {
                headers: {
                    "Authorization" : "Bearer " + localStorage.token
                }
            })
        
        dispatch('itemUpdated')

    }

</script>


<div class="todoItem">
    <h4>{description}</h4>
    <p>{email}</p>
    <p>{submitted}</p>


    <button on:click={onDelete}>Delete</button>
    <button on:click={onEdit}>Edit</button>
</div>


<style>
    .todoItem{
        width: 15rem;
        min-height: 5rem;
        border: gray solid 1px;
        border-radius: 5px;
    }


</style>
