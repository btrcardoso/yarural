import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import QuestionLikeService from 'App/Services/QuestionLikeService'
import QuestionService from 'App/Services/QuestionService'

export default class QuestionLikesController {

    public async like({params, auth, response} : HttpContextContract){

        await QuestionLikeService.like(
            auth.user!.id, 
            params.questionId
        )
        
        let question = await Question.findOrFail(params.questionId)
        let countLikes = await QuestionService.countLikes(question)
        return response.send({countLikes})

    }

    public async dislike({params, auth} : HttpContextContract){

        await QuestionLikeService.dislike(
            auth.user!.id, 
            params.questionId
        )

    }

    public async destroy({params, auth} : HttpContextContract){

        await QuestionLikeService.destroyQuestionLike(
            auth.user!.id,
            params.questionLikeId
        )
        
    }

}
