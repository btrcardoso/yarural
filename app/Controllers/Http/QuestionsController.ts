import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Question from 'App/Models/Question'
import User from 'App/Models/User'
import QuestionService from 'App/Services/QuestionService'
import QuestionValidator from 'App/Validators/QuestionValidator'

export default class QuestionsController {
  public async create({ view }: HttpContextContract) {

    const categories = await Category.query().orderBy('name');

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

  public async show({ params, view, auth }: HttpContextContract) {
    let question = await Question.findOrFail(params.id)
    const user = await User.findOrFail(question.userId)
    const category = await Category.find(question.categoryId) || null
    const date  = question.createdAt.toFormat("dd 'de' MMM'.' yyyy '-' hh':'mm")

    await question.load('answers')
    const answers = question.answers

    let answerDate, answer
    for(answer of answers){
      await answer.load('user')
      answerDate = answer.createdAt.toFormat("dd 'de' MMM'.' yyyy '-' HH':'mm")
      answer = Object.assign(answer, {user: answer.user, date: answerDate})
    }

    question = await QuestionService.getQuestionWithLikes(question, auth.user!.id)
    
    return view.render('questions/show', {question, user, date, category, answers})
  }

  public async destroy({params, response, auth} : HttpContextContract){
    const quest = await Question.findOrFail(params.id)

    if(quest.userId == auth.user!.id){
      await QuestionService.destroyQuestion(quest.id)
    }
    
    return response.redirect().toRoute('home.index')
  }
}
