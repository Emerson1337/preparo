const form = document.getElementById('cadastroForm')

form.addEventListener('submit',(e)=> {
    e.preventDefault()
})

const api = axios.create({
    baseURL: 'http://localhost:2000',
      })


const cadastrar = () => {

    let dadosCadastro = {
        email: form.email.value,
        senha: form.senha.value,
        nome: form.nome.value,
        sobrenome: form.sobrenome.value,
        celular: form.celular.value,
        cep: form.cep.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        bairro: form.bairro.value,
        endereco: form.endereco.value,
        numero: parseInt(form.numero.value, 10),
        complemento: form.complemento.value,
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

        api.post('/usuarios', dadosCadastro)
        .then((response) => {
                    
            window.location.href="login.html"                       
        }).catch( (e) => {
                alert('Dados inválidos, tente novamente')
                console.log(e.message)
        })
}



