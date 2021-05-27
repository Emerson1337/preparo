const express = require('express')
const Usuario = require('../models/usuario')

const router = express.Router()

const auth = require('../middlewares/auth.js')

//criar usuario
router.post('/usuarios', async (req, res) => {

    try {
        const usuario = new Usuario(req.body)

        const duplicado = await Usuario.findOne({ email: req.body.email })

        if (duplicado) {
            res.status(400).send({ error: 'Este email já está sendo usado' })
        }
        await usuario.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
    }

})


//log in
router.post('/usuarios/login', async (req, res) => {
    try {

        const usuario = await Usuario.acharPorCredenciais(req.body.email, req.body.senha)
        const token = await usuario.generateAuthToken()

        res.status(200).send({ /*usuario: usuario,*/ token: token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//logout de todas as sessões
router.post('/usuarios/logoutGeral', auth, async (req, res) => {
    req.user.tokens = []
    await req.user.save()
    res.send('fora de todas as sessões')
})

//log out
router.post('/usuarios/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.Status(500).send()
    }
})

//atualizar dados de um usuario 
router.patch('/usuarios', auth, async (req, res) => {
    const campos = Object.keys(req.body)
    const camposValidos = ['nome', 'sobrenome', 'email', 'senha', 'celular', 'cep', 'cidade', 'estado', 'bairro', 'endereco', 'numero', 'complemento', 'github', 'behance', 'linkedin']

    const opValida = campos.every((campo) => {
        return camposValidos.includes(campo)
    })

    if (!opValida) {
        res.status(400).send({ error: 'campos inválidos' })
    }

    try {
        const usuario = req.user

        if (!usuario) {
            res.status(404).send({ error: 'usuario não encontrado' })
        }

        campos.forEach((campo) => {
            usuario[campo] = req.body[campo]
        })
        usuario.save()

        res.send(usuario)
    } catch (e) {
        res.status(500).send(e)
    }
})

//atualizar dados de um usuario 
router.get('/listar-usuarios', auth, async (req, res) => {
    try {

        Usuario.find({}, function (err, users) {
            var userMap = [];
            var aux = 0;
            users.forEach(function (user) {
                userMap[aux] = user.nome;
                aux++;
            });
            res.send(userMap);
        });

    } catch (e) {
        res.status(500).send(e)
    }
})

//deletar usuario 
router.delete('/usuarios/:id', auth, async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id)
        if (!usuario) {
            return res.status(404).send()
        }
        res.send(usuario)
    } catch (e) {
        res.send(500).send(e)
    }

})

//pagina pessoal do usuario
router.get('/usuarios/perfil', auth, async (req, res) => {
    const usuario = req.user
    res.send(usuario)

})





router.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.find({})
    res.send(usuarios)
})

module.exports = router