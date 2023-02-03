import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import QuestionLikeService from 'App/Services/QuestionLikeService'
import QuestionService from 'App/Services/QuestionService'
import UserService from 'App/Services/UserService'

export default class QuestionLikesController {

    public async like({auth, params, response} : HttpContextContract){

        const voteType = await QuestionLikeService.getQuestionLikeValue(auth.user!.id, params.questionId)

        await QuestionLikeService.like(
            auth.user!.id, 
            params.questionId
        )
        
        let question = await Question.findOrFail(params.questionId)
        let countLikes = await QuestionService.countLikes(question)
        
        await question.load('user')
        
        if (voteType == 0) {
            await UserService.changeScore(auth.user!, 'vote')
            await UserService.changeScore(question.user, 'receiveLike')
        }
        else if (voteType == -1) {
            await UserService.changeScore(question.user, 'removedDislike')
            await UserService.changeScore(question.user, 'receiveLike')
        }

        return response.send({countLikes})

    }

    public async dislike({auth, params, response} : HttpContextContract){

        const voteType = await QuestionLikeService.getQuestionLikeValue(auth.user!.id, params.questionId)

        await QuestionLikeService.dislike(
            auth.user!.id, 
            params.questionId
        )

        let question = await Question.findOrFail(params.questionId)
        let countLikes = await QuestionService.countLikes(question)

        await question.load('user')

        if (voteType == 0) {
            await UserService.changeScore(auth.user!, 'vote')
            await UserService.changeScore(question.user, 'receiveDislike')
        }
        else if (voteType == 1) {
            await UserService.changeScore(question.user, 'removedLike')
            await UserService.changeScore(question.user, 'receiveDislike')
        }

        return response.send({countLikes})

    }

    public async destroy({auth, params, response} : HttpContextContract){

        const voteType = await QuestionLikeService.getQuestionLikeValue(auth.user!.id, params.questionId)

        await QuestionLikeService.destroyQuestionLike(
            auth.user!.id,
            params.questionId
        )

        let question = await Question.findOrFail(params.questionId)
        let countLikes = await QuestionService.countLikes(question)

        await question.load('user')


        if(voteType == 1) {
            await UserService.changeScore(auth.user!, 'removeVote')
            await UserService.changeScore(question.user, 'removedLike')
        }
        else if (voteType == -1) {
            await UserService.changeScore(auth.user!, 'removeVote')
            await UserService.changeScore(question.user, 'removedDislike')
        }

        return response.send({countLikes})
        
    }

}
