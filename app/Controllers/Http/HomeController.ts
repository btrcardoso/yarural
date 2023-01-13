import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'

export default class HomeController {

    public async index({ request, auth, view }: HttpContextContract){
        if (auth.use('web').isLoggedIn){
            const page = request.input('page', 1)
            const limit = 10

            const questions = await Question.query().preload('user').orderBy('created_at', 'desc').paginate(page, limit)

            return view.render('home/loggedInHome', {questions: questions})
        }
        else{

            return view.render('home/notLoggedInHome')
        }
    }

}


