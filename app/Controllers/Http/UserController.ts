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
import AnswerService from 'App/Services/AnswerService'

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

        const users = await User.query().orderBy('score', 'desc')

        const matchUser = (actualUser: User) => actualUser.id == user.id;

        const ranking = users.findIndex(matchUser) + 1

        let questions = await Question.query().where('userId', user.id).orderBy('created_at', 'desc').paginate(page, limit)
        questions.baseUrl('/perfil/ya/' + user.username)

        for(let question of questions){
            question = await QuestionService.getQuestionWithLikes(question, auth.user!.id)
        }

        return view.render('user/profile', {user, questions, ranking})
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

            let likes = await QuestionService.countLikes(answer.question)
            let likeValue = await QuestionLikeService.getQuestionLikeValue(auth.user!.id, answer.question.id)
            answer.question = Object.assign(answer.question, {likes, likeValue})

            // o ideal seria utilizar este comando, mas ele não é aceito por causa do belongsTo de answer.question
            //answer.question = await QuestionService.getQuestionWithLikes(answer.question, auth.user!.id)
            
            answer = await AnswerService.getAnswerWithLikes(answer, auth.user!.id)
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
    
    public async rank({request, view}: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = 50

        const users = await User.query().orderBy('score', 'desc').paginate(page, limit)
        users.baseUrl('/ranking/')

        for(const user of users) {
            user["index"] = users.indexOf(user) + limit*(page-1) + 1
            user["questionsCount"] = await UserService.countQuestions(user)
            user["answersCount"] = await UserService.countAnswers(user)
        }
        
        return view.render('user/rank', {users: users})

    }
}

