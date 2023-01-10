import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnswerService from 'App/Services/AnswerService'
import AnswerValidator from 'App/Validators/AnswerValidator'

export default class AnswersController {

    public async store({request, params, auth, response} : HttpContextContract){

        const data = await request.validate(AnswerValidator)

        await AnswerService.createAnswer(
            params.id, auth.user!.id, data.description, data.source
        )

        return response.redirect().toRoute('question.show', { id: params.id })
    }  

    public async destroy({params, response, auth} : HttpContextContract){
        
        const questionId = await AnswerService.destroyAnswer(
            params.id, auth.user!.id
        )
        
        return response.redirect().toRoute('question.show', {id: questionId})
    }

}
