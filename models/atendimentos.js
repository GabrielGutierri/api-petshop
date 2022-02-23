const { default: axios } = require('axios');
const moment = require('moment');

const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimento');
class Atendimento{
    
    constructor(){

        this.dataEhValida = ({data, dataCriacao})=> moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = (tamanho)=> tamanho >= 5;
        this.valida = (parametros)=>{
            this.validacoes.filter(campo => {
                const {nome} = campo;
                const parametro = parametros[nome]

                return !campo.valido(parametro);
            });
        }
        
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual à data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }
    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        };
        const erros = this.valida(parametros);
        const existemErros = erros.length;

        const atendimentoDatado = {...atendimento, dataCriacao, data};
        
        return repositorio.adiciona(atendimentoDatado)
            .then((resultados)=>{
                const id = resultados.id;
                return {...atendimento, id};
            });
        
    }

    lista(){
        return repositorio.lista();
    }

    buscaPorId(id){
        return repositorio.buscaPorId(id)
        .then((resultados)=>{
            return resultados;
        });
    }

    altera(id, valores){
        if(valores.data){
            valores.data = moment(valores.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        
        return repositorio.altera(id, valores)
        .then(resultados => {
            return resultados;
        });
    }

    deleta(id){
        return repositorio.deleta(id)
        .then(resultados=> {return resultados});
    }
}

module.exports = new Atendimento();