import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Question from 'App/Models/Question'
import QuestionService from 'App/Services/QuestionService'

export default class CategoriesController {

    public async index({ view }: HttpContextContract){

        const categories = await Category.query().orderBy('name')

        return view.render('categories/index', {categories: categories})
    }

    public async show({ view, params, request, auth }: HttpContextContract){
        const page = request.input('page', 1)
        const limit = 10

        let questions = await Question.query().where('categoryId', params.id).preload('user').orderBy('createdAt', 'desc').paginate(page, limit)
        for(let question of questions){
            question = await QuestionService.getQuestionWithLikes(question, auth.user!.id)
        }
        
        const category = await Category.findOrFail(params.id)

        return view.render('categories/show', {questions: questions, category: category})
    }

}
