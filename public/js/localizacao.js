const form = document.getElementById('localizacaoForm')

//axios config
const api = axios.create({
    baseUrl: 'http://localhost:2000'
})


//autenticaçao
async function auth() {
    try {
        const user = await usuario()           
        
       
        
            form.cep.value = user.cep
            form.cidade.value = user.cidade
            form.estado.value = user.estado
            form.bairro.value = user.bairro            
            form.endereco.value = user.endereco
            form.numero.value = user.numero
            form.complemento.value = user.complemento || ''

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

const atualizarLocalizacao = () => {
    

    let dadosCadastro = {
        cep: form.cep.value,       
        cidade: form.cidade.value,
        estado: form.estado.value,
        bairro: form.bairro.value,      
        endereco: form.endereco.value,
        numero: form.numero.value,
        complemento: form.complemento.value 
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






