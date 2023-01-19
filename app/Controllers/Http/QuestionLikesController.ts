import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuestionLikeService from 'App/Services/QuestionLikeService'

export default class QuestionLikesController {

    public async like({params, auth} : HttpContextContract){

        await QuestionLikeService.like(
            auth.user!.id, 
            params.questionId
        )

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
