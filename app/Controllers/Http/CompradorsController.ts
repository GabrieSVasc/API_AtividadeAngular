import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comprador from 'App/Models/Comprador'

export default class CompradorsController {

    public async store({request, response}: HttpContextContract){
        const body = request.body()

        const comprador = await Comprador.create(body)

        response.status(201)

        return{
            message: 'Comprador cadastrado com sucesso!',
            data: comprador
        }
    }

    public async index(){

        const compradores = await Comprador.all()

        return{
            data: compradores,
        }
    }

    public async show({params}: HttpContextContract){
        const comprador = await Comprador.findOrFail(params.id)

        return{
            data: comprador,
        }
    }
    public async destroy({params}:HttpContextContract){
        const comprador = await Comprador.findOrFail(params.id)

        await comprador.delete()
        return{
            message: "Comprador excluído com sucesso!"
        }
    }
    public async update({params, request}: HttpContextContract){

        const body = request.body()

        const comprador = await Comprador.findOrFail(params.id)

        comprador.nome = body.nome
        comprador.produto = body.produto
        comprador.vendedor = body.vendedor

        await comprador.save()
        return {
            message: 'Comprador atualizado com sucesso!',
            data: comprador
        }
    }
}
