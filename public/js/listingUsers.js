const divListaUsuarios = document.getElementById('lista')

//axios config
const api = axios.create({
  baseUrl: 'http://localhost:2000'
})


const listarUsuarios = () => {

  const token = localStorage.getItem('token')
  var headersOptions = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }


  api.get('/listar-usuarios', headersOptions)
    .then((response) => {
      console.log("opa")
      response.data.map((nome) => {
        var div = document.createElement('div');
        div.setAttribute('class', 'divUsers')
        console.log(nome);
        div.innerHTML = "Usuário: " + nome;
        divListaUsuarios.appendChild(div);
      })
    }).catch((e) => {
      alert('Dados inválidos, tente novamente')
      window.location.href = "login.html"
      console.log(e.message)
    })
}

listarUsuarios()
