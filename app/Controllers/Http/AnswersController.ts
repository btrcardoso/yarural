import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AnswerValidator from 'App/Validators/AnswerValidator'

export default class AnswersController {

    public async store({request, response} : HttpContextContract){

        const data = await request.validate(AnswerValidator)

    }

    
    
}
