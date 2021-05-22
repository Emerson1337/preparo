const mongoose = require('mongoose')//inclusão dos recursos do módulo npm mongoose para lidar com os documentos do banco de dados 

//conectar ao banco de dados local chamado preparo-api
mongoose.connect('mongodb://127.0.0.1/preparo-api',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex: true
})






