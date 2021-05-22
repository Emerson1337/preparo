const welcomeTitle = document.getElementById('welcome')


//axios config
const api = axios.create({
    baseUrl: 'http://localhost:2000'
})


//autenticaçao
async function auth (){
    try{
        const user = await usuario()
        welcomeFunction(user)
    }catch(e){
        alert('Por favor, faça Login')
        window.location.href='login.html'
    }
}

//exibir mensagem personalizada de acordo com o usuario
const welcomeFunction = (usuario) => {
    welcomeTitle.innerHTML='Seja bem vindo(a): ' + usuario.nome;
}


//obter os dados do usuario
const usuario = async () => {
    
    try{
            const token = localStorage.getItem('token')
            var headersOptions = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            } 
            const response = await api.get('/usuarios/perfil', headersOptions)
            const usuario = response.data
            return usuario
    }catch(e){
        console.log(e.message)
    }
    

}




auth()






