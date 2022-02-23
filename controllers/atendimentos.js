const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res)=> {
            Atendimento.lista()
                .then(resultados =>{
                    res.json(resultados);
                })
                .catch(erro => res.status(400).json(erro));
        }
    );
    
    app.get('/atendimentos/:id', (req, res)=>{
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id)
            .then(resultados => res.json(resultados))
            .catch(erro=> res.status(400).json(erro));
    });

    app.post('/atendimentos', (req,res) => {
        const atendimento = req.body;
        console.log(atendimento);
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado=>{
                res.status(201).json(atendimentoCadastrado);
            })
            .catch(erros =>{
                res.status(400).json(erros);
            });   
    });

    app.patch('/atendimentos/:id', (req, res)=>{
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores)
        .then(()=>{
            res.status(400).json({...valores, id});
        })
        .catch(erro=> res.status(400).json(erro));
    });

    app.delete('/atendimentos/:id', (req,res)=>{
        const id = parseInt(req.params.id);
        Atendimento.deleta(id)
        .then((resultados)=>{
            res.status().json(resultados);
        })
        .catch(erro=> res.status(400).json(erro));
    })
}