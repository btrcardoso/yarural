import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Question from 'App/Models/Question'
import User from 'App/Models/User'
import QuestionService from 'App/Services/QuestionService'
import QuestionValidator from 'App/Validators/QuestionValidator'

export default class QuestionsController {
  public async create({ view }: HttpContextContract) {

    const categories = await Category.all();

    return view.render('questions/create', {categories})
  }

  public async store({ response, request, auth }: HttpContextContract) {

    const data = await request.validate(QuestionValidator)

    const categoryId = data.categoryId ? data.categoryId : null; 

    const quest = await QuestionService.createQuestion(
      data.question,
      data.description,
      auth.user!.id,
      categoryId
    )

    return response.redirect().toRoute('question.show', { id: quest.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const quest = await Question.findOrFail(params.id)
    const user = await User.findOrFail(quest.userId)

    return view.render('questions/show', { question: quest , user: user})
  }
}
