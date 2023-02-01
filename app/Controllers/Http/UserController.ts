import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserService from 'App/Services/UserService'
import User from 'App/Models/User'
import ProfileValidator from 'App/Validators/ProfileValidator'
import UserValidator from 'App/Validators/UserValidator'
import UsernameValidator from 'App/Validators/UsernameValidator'
import Question from 'App/Models/Question'
import Answer from 'App/Models/Answer'
import QuestionService from 'App/Services/QuestionService'
import QuestionLikeService from 'App/Services/QuestionLikeService'

export default class UserController {

    public async create({ auth, view, response }: HttpContextContract) {

        if(auth.isLoggedIn) {
            response.redirect().toRoute('home.index')
        }
        else {
            return view.render('user/create')
        }

    }

    public async store({ request, response }: HttpContextContract) {

        const data = await request.validate(UserValidator)

        const email =  data.email
        const password = data.password
        const name = data.name
        const username = data.username

        UserService.createUser(email,password, name, username)

        return response.redirect().toRoute('auth.create')
    }

    public async show({ view, params, request, auth }: HttpContextContract){

        const page = request.input('page', 1)
        const limit = 10

        const user = await User.findByOrFail('username', params.username)

        let questions = await Question.query().where('userId', user.id).orderBy('created_at', 'desc').paginate(page, limit)
        questions.baseUrl('/perfil/ya/' + user.username)

        for(let question of questions){
            let likes = await QuestionService.countLikes(question)
            let likeValue = await QuestionLikeService.getQuestionLikeValue(auth.user!.id, question.id)
            question = Object.assign(question, {likes, likeValue})
        }

        return view.render('user/profile', {user, questions})
    }

    public async showAnswers({view, params, request, auth}: HttpContextContract){

        const page = request.input('page', 1)
        const limit = 10

        const user = await User.findByOrFail('username', params.username)

        const answers = await Answer.query().where('userId', user.id).orderBy('created_at', 'desc').paginate(page, limit)
        answers.baseUrl('/perfil/ya/' + user.username + '/respostas')

        for(let answer of answers){
            await answer.load('question')
            await answer.question.load('user')

            // let likes = await QuestionService.countLikes(answer.question)
            // let likeValue = await QuestionLikeService.getQuestionLikeValue(auth.user!.id, answer.question.id)
            // answer.question = Object.assign(answer.question, {likes, likeValue})
            answer.question = await QuestionService.getQuestionWithLikes(answer.question, auth.user!.id)
        }

        return view.render('user/profile', {user, answers})
    }

    public async edit({ view }: HttpContextContract){
        return view.render('user/edit')
    }

    public async update({auth, request, response}: HttpContextContract){

        const user = await User.findOrFail(auth.user?.id)

        const inputUsername = request.input('username')
        
        var data: {
            name: string;
            username: string;
            description: string | null;
        };

        if(inputUsername != user.username) {
            data = await  request.validate(ProfileValidator)
        }
        else {
            data = await request.validate(UsernameValidator)
        }

        user.name = data.name
        user.username = data.username
        user.description = data.description

        user.save()

        return response.redirect().toRoute('user.show', {username: user.username})

    }
}

