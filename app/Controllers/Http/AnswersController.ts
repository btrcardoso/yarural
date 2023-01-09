import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnswerService from 'App/Services/AnswerService'
import AnswerValidator from 'App/Validators/AnswerValidator'

export default class AnswersController {

    public async store({request, params, auth, response} : HttpContextContract){

        const data = await request.validate(AnswerValidator)

        const answer = await AnswerService.createAnswer(
            params.id, auth.user!.id, data.description, data.source
        )

        return response.redirect().toRoute('question.show', { id: params.id })
    }

    
    
}
