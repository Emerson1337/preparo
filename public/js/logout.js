const logoutButton = document.getElementById('logout')

//fazer logout
logoutButton.onclick = ()=>{
    

    const token = localStorage.getItem('token')

    var headersOptions = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    } 

    api.post('/usuarios/logout','',headersOptions).then(() => {                          
        
        localStorage.removeItem('token')
        window.location.href="login.html"
    }).catch((e) => {
        console.log(e.message)
        alert('Por favor, autentique')
        window.location.href="login.html"
    }) 
}