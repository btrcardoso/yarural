import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import QuestionService from 'App/Services/QuestionService'

export default class HomeController {

    public async index({ request, auth, view }: HttpContextContract){
        if (auth.use('web').isLoggedIn){
            const page = request.input('page', 1)
            const limit = 10

            const questions = await Question.query().preload('user').orderBy('created_at', 'desc').paginate(page, limit)
            for(let question of questions){
                question = await QuestionService.getQuestionWithLikes(question, auth.user!.id)
            }

            return view.render('home/loggedInHome', {questions: questions})
        }
        else{

            return view.render('home/notLoggedInHome')
        }
    }

    public async aboutRank({view}: HttpContextContract) {

        return view.render('home/aboutRank')
    } 

}


