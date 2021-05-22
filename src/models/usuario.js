const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//criar esquema para o model do Usuario
const usuarioSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, "Email inválido"]
        },
        senha: {
            type: String,
            minLength: 6,
            required: true
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        nome: {
            type: String,
            trim: true,
            required: true
        },
        sobrenome: {
            type: String,
            trim:true,
            required: true
        },
        celular: {
            type: String,            
            trim: true,
            required: true,
            validate(value) {
                if (!validator.isMobilePhone(value, 'pt-BR')) {
                    throw new Error('O numero não é um telefone válido')
                }
            }
        },
        cep: {
            type: String,
            minLength: 8,
            maxLength: 8,
            trim:true,
            required: true
        },
        cidade: {
            type: String,
            trim: true,            
            required: true
        },
        estado: {
            type: String,
            trim: true,  
            uppercase:true,
            required: true
        },
        bairro: {
            type: String,
            trim: true,  
            required: true
        },
        endereco: {
            type: String,
            trim: true,  
            required: true
        },
        numero: {
            type: Number,
            required: true
        },
        complemento: {
            type: String,
            trim: true,  
            
        },
        github: {
            type:String,
            validate:[validator.isURL, "URL inválida."]
        },
        behance: {
            type:String,
            validate:[validator.isURL, "URL inválida."]
        },
        linkedin: {
            type:String,
            validate:[validator.isURL, "URL inválida."]
        }


    }
)

//retirar a senha e os tokens antes de criar o JSON para o objeto usuario
usuarioSchema.methods.toJSON = function () {
    const usuario = this
    const objetoUsuario = usuario.toObject()

    delete objetoUsuario.senha
    delete objetoUsuario.tokens

    return objetoUsuario
}


//criar um método para o schema usuarioSchema para gerar um token para o usuario quando logado
usuarioSchema.methods.generateAuthToken = async function () {

    const usuario = this
    const token = jwt.sign({ _id: usuario.id.toString() }, 'preparo', {

        expiresIn: '24h'

         })

    usuario.tokens = usuario.tokens.concat({ token: token })
    await usuario.save()

    return token
}



//criar um método para o Schema usuarioSchema para achar um usuario no DB pelo email e senha
usuarioSchema.statics.acharPorCredenciais = async function (email, senha) {
    const usuario = await Usuario.findOne({ email: email })

    if (!usuario) {
        throw new Error('usuario ou senha incorretos')
    }

    const validarSenha = await bcrypt.compare(senha, usuario.senha)/*.compare(String, hash)*/

    if (!validarSenha) {
        throw new Error('usuario ou senha incorretos')
    }

    return usuario
}

//fazer um hash da senha para salvar no banco de dados 
usuarioSchema.pre('save', async function (next) {
    const usuario = this
    if (usuario.isModified('senha')) {
        try {
            usuario.senha = await bcrypt.hash(usuario.senha, 8)
        } catch (e) {
            console.log('unable to hash password')
        }
    }
    next()
})


//criar model Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario


