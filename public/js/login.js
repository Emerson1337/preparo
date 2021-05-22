const form = document.getElementById('loginForm')

form.addEventListener('submit',(e)=> {
    e.preventDefault()
})

const api = axios.create({
    baseURL: 'http://localhost:2000'
      })


const submitForm = () => {
    let credenciais = {
        email: form.email.value,
        senha: form.senha.value
    }

        api.post('/usuarios/login', credenciais).then((response) => {
            localStorage.setItem('token',response.data.token)
            window.location.href="perfil.html"                       
        }).catch( (e) => {
            console.log(e)
            alert('Usuario ou senha incorretos')
        })
}



