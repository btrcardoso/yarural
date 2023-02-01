import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'
import AnswerLikeService from 'App/Services/AnswerLikeService'
import AnswerService from 'App/Services/AnswerService'

export default class AnswerLikesController {

    public async like({params, auth, response} : HttpContextContract){

        await AnswerLikeService.like(
            auth.user!.id, 
            params.answerId
        )
        
        let answer = await Answer.findOrFail(params.answerId)
        let countLikes = await AnswerService.countLikes(answer)
        return response.send({countLikes})

    }

    public async dislike({params, auth, response} : HttpContextContract){

        await AnswerLikeService.dislike(
            auth.user!.id, 
            params.answerId
        )

        let answer = await Answer.findOrFail(params.answerId)
        let countLikes = await AnswerService.countLikes(answer)
        return response.send({countLikes})

    }

    public async destroy({params, auth, response} : HttpContextContract){

        await AnswerLikeService.destroyAnswerLike(
            auth.user!.id,
            params.answerId
        )

        let answer = await Answer.findOrFail(params.answerId)
        let countLikes = await AnswerService.countLikes(answer)
        return response.send({countLikes})
        
    }

    

}
