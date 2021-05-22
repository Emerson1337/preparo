const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')


const auth = async  (req, res, next) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'preparo')//decoded recebe um objeto com o _id do usuario que possui esse token
        const usuario = await Usuario.findOne({_id:decoded._id, 'tokens.token': token})
        
        if(!usuario){
            throw new Error()            
        }
        
        

        req.token = token
        req.user = usuario        
        
        next()   
    }catch(e){
        res.status(401).send({error: 'por favor, autentique'})
        
    }
   
}

module.exports = auth