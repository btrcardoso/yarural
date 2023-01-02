 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuestionService from 'App/Services/QuestionService'

export default class QuestionsController {

    public async create({view}: HttpContextContract){


        return view.render('questions/create')
    
    }

    public async store({response, request}: HttpContextContract){

        QuestionService.createQuestion(request.input('question'), request.input('description'))

        return response.redirect().toRoute('home.index')
    
    }

}
