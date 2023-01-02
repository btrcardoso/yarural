 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class QuestionsController {

    public async create({view}: HttpContextContract){


        return view.render('questions/create')
    
    }

}
