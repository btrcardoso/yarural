import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnswerService from 'App/Services/AnswerService'
import AnswerValidator from 'App/Validators/AnswerValidator'
import UserService from 'App/Services/UserService'

export default class AnswersController {

    public async store({request, params, auth, response} : HttpContextContract){

        const data = await request.validate(AnswerValidator)

        await UserService.changeScore(auth.user!, 'answer')

        await AnswerService.createAnswer(
            params.id, auth.user!.id, data.description, data.source
        )

        return response.redirect().toRoute('question.show', { id: params.id })
    }  

    public async destroy({params, response, auth} : HttpContextContract){
        
        await UserService.changeScore(auth.user!, 'removeAnswer')

        const questionId = await AnswerService.destroyAnswer(
            params.id, auth.user!.id
        )
        
        return response.redirect().toRoute('question.show', {id: questionId})
    }

}
