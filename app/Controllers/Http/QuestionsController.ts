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
    const categ = await Category.find(quest.categoryId) || null
    const date  = quest.createdAt.toFormat("dd 'de' MMM'.' yyyy '-' hh':'mm")

    await quest.load('answers')
    const answers = quest.answers

    return view.render('questions/show', { question: quest , user, date, category: categ, answers})
  }

  public async destroy({params, response, auth} : HttpContextContract){
    const quest = await Question.findOrFail(params.id)

    if(quest.userId == auth.user!.id){
      await QuestionService.destroyQuestion(quest.id)
    }
    
    return response.redirect().toRoute('user.show')
  }
}
