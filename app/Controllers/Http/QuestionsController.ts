import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import QuestionService from 'App/Services/QuestionService'
import QuestionValidator from 'App/Validators/QuestionValidator'

export default class QuestionsController {
  public async create({ view }: HttpContextContract) {
    return view.render('questions/create')
  }

  public async store({ response, request, auth }: HttpContextContract) {
    
    const data = await request.validate(QuestionValidator)

    const quest = await QuestionService.createQuestion(
      data.question,
      data.description,
      auth.user!.id
    )

    return response.redirect().toRoute('question.show', { id: quest.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const quest = await Question.findOrFail(params.id)

    return view.render('questions/show', { question: quest })
  }
}
