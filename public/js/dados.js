const form = document.getElementById('dadosForm')

//axios config
const api = axios.create({
    baseUrl: 'http://localhost:2000'
})


//autenticaçao
async function auth() {
    try {
        const user = await usuario()              
        
            form.email.value = user.email
            form.nome.value = user.nome
            form.sobrenome.value = user.sobrenome
            form.celular.value = user.celular            
            form.github.value = user.github || ''
            form.behance.value = user.behance || ''
            form.linkedin.value = user.linkedin || ''

    } catch (e) {
        alert('Por favor, faça Login')
        window.location.href = 'login.html'
    }
}


//obter os dados do usuario
const usuario = async () => {

    try {
        const token = localStorage.getItem('token')

        var headersOptions = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        const response = await api.get('/usuarios/perfil', headersOptions)
        const usuario = response.data
        return usuario
    } catch (e) {
        console.log(e.message)
    }


}

const atualizarDados = () => {
    

    let dadosCadastro = {
        email: form.email.value,       
        nome: form.nome.value,
        sobrenome: form.sobrenome.value,
        celular: form.celular.value,      
        github: form.github.value,
        behance: form.behance.value,
        linkedin: form.linkedin.value
    }
    if(dadosCadastro.behance == ''){
        delete dadosCadastro.behance
    }
    if(dadosCadastro.github == ''){
        delete dadosCadastro.github
    }
    if(dadosCadastro.linkedin == ''){
        delete dadosCadastro.linkedin
    }
    const token = localStorage.getItem('token')
    var headersOptions = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

     api.patch('/usuarios', dadosCadastro, headersOptions)
        .then((response) => {
            alert('Dados atualizados!')                    
            window.location.href="perfil.html"                       
        }).catch( (e) => {
                alert('Dados inválidos, tente novamente')
                console.log(e.message)
        })
}




auth()






