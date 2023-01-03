 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuestionService from 'App/Services/QuestionService'
import QuestionValidator from 'App/Validators/QuestionValidator'

export default class QuestionsController {

    public async create({view}: HttpContextContract){


        return view.render('questions/create')
    
    }

    public async store({response, request}: HttpContextContract){

        const data = await request.validate(QuestionValidator)

        QuestionService.createQuestion(data.question, data.description)

        return response.redirect().toRoute('home.index')
    
    }

}
