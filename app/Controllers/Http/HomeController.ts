import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'

export default class HomeController {

    public async index({ auth, view }: HttpContextContract){
        if (auth.use('web').isLoggedIn){

            const questions = await Question.query().orderBy('created_at', 'desc').paginate(1,10)

            return view.render('home/loggedInHome', {questions: questions})
        }
        else{

            return view.render('home/notLoggedInHome')
        }
    }

}


