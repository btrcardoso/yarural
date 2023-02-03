import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'
import AnswerLikeService from 'App/Services/AnswerLikeService'
import AnswerService from 'App/Services/AnswerService'
import UserService from 'App/Services/UserService'

export default class AnswerLikesController {

    public async like({auth, params, response} : HttpContextContract){

        const voteType = await AnswerLikeService.getAnswerLikeValue(auth.user!.id, params.answerId)

        await AnswerLikeService.like(
            auth.user!.id, 
            params.answerId
        )
        
        let answer = await Answer.findOrFail(params.answerId)
        let countLikes = await AnswerService.countLikes(answer)

        await answer.load('user')

        if (voteType == 0) {
            await UserService.changeScore(auth.user!, 'vote')
            await UserService.changeScore(answer.user, 'receiveLike')
        }
        else if (voteType == -1) {
            await UserService.changeScore(answer.user, 'removedDislike')
            await UserService.changeScore(answer.user, 'receiveLike')
        }

        return response.send({countLikes})

    }

    public async dislike({auth, params, response} : HttpContextContract){

        const voteType = await AnswerLikeService.getAnswerLikeValue(auth.user!.id, params.answerId)

        await AnswerLikeService.dislike(
            auth.user!.id, 
            params.answerId
        )

        let answer = await Answer.findOrFail(params.answerId)
        let countLikes = await AnswerService.countLikes(answer)

        await answer.load('user')

        if (voteType == 0) {
            await UserService.changeScore(auth.user!, 'vote')
            await UserService.changeScore(answer.user, 'receiveDislike')
        }
        else if (voteType == 1) {
            await UserService.changeScore(answer.user, 'removedLike')
            await UserService.changeScore(answer.user, 'receiveDislike')
        }

        return response.send({countLikes})

    }

    public async destroy({auth, params, response} : HttpContextContract){

        const voteType = await AnswerLikeService.getAnswerLikeValue(auth.user!.id, params.answerId)

        await AnswerLikeService.destroyAnswerLike(
            auth.user!.id,
            params.answerId
        )

        let answer = await Answer.findOrFail(params.answerId)
        let countLikes = await AnswerService.countLikes(answer)

        await answer.load('user')

        if (voteType == 1) {
            await UserService.changeScore(auth.user!, 'removeVote')
            await UserService.changeScore(answer.user, 'removedLike')
        }
        else if (voteType == -1) {
            await UserService.changeScore(auth.user!, 'removeVote')
            await UserService.changeScore(answer.user, 'removedDislike')
        }

        return response.send({countLikes})
        
    }

    

}
