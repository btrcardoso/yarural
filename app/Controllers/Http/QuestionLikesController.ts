import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import User from 'App/Models/User'
import QuestionLikeService from 'App/Services/QuestionLikeService'
import QuestionService from 'App/Services/QuestionService'
import UserService from 'App/Services/UserService'

export default class QuestionLikesController {

    public async like({params, auth, response} : HttpContextContract){

        await QuestionLikeService.like(
            auth.user!.id, 
            params.questionId
        )
        
        let question = await Question.findOrFail(params.questionId)
        let countLikes = await QuestionService.countLikes(question)

        await question.load('user')
        UserService.changeScore(auth.user!, 'vote')
        UserService.changeScore(question.user, 'receiveLike')

        return response.send({countLikes})

    }

    public async dislike({params, auth, response} : HttpContextContract){

        await QuestionLikeService.dislike(
            auth.user!.id, 
            params.questionId
        )

        let question = await Question.findOrFail(params.questionId)
        let countLikes = await QuestionService.countLikes(question)

        await question.load('user')
        UserService.changeScore(auth.user!, 'vote')
        UserService.changeScore(question.user, 'receiveDislike')

        return response.send({countLikes})

    }

    public async destroy({params, auth, response} : HttpContextContract){

        const voteType = await QuestionLikeService.getQuestionLikeValue(auth.user!.id, params.questionId)

        await QuestionLikeService.destroyQuestionLike(
            auth.user!.id,
            params.questionId
        )

        let question = await Question.findOrFail(params.questionId)
        let countLikes = await QuestionService.countLikes(question)

        await question.load('user')
        console.log(voteType)

        if(voteType == 1) {
            UserService.changeScore(auth.user!, 'removeVote')
            UserService.changeScore(question.user, 'removedLike')
        }
        else if (voteType == -1) {
            UserService.changeScore(auth.user!, 'removeVote')
            UserService.changeScore(question.user, 'removedDislike')
        }

        return response.send({countLikes})
        
    }

}
