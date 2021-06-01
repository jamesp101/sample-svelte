
<script>
    import '../style.css'
    import { login } from '$lib/auth'
    import { session } from '$app/stores';
import { goto } from '$app/navigation';


    let identifier=''
    let password  = ''



    async function onClickLogin (){
        await login(identifier, password)
    }

</script>

<label for="">Username</label>
<input type="text" bind:value={identifier}>

<label for="">Password</label>
<input type="password" bind:value={password}>




<button on:click={onClickLogin}>Login</button>