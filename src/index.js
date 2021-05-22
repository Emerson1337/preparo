require('./db/mongoose')            /*faz conexão com o banco de dados*/

const express = require('express')          
const UsuarioRota = require('./routes/usuario')
const path = require('path')

const app = express()

const publicPath = path.join(__dirname, '../public')
//configurações para o express
const port = process.env.PORT || 2000 //definir porta
app.use(express.json())/*automaticamente converte JSON em objetos nas requisições*/
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.send()
})
//configurar rotas a serem usadas
app.use(UsuarioRota)


app.listen(port,()=>{
    console.log('servidor anexado a porta: ' + port)
})