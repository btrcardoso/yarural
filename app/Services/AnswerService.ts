import Answer from "App/Models/Answer"
import AnswerLikeService from "./AnswerLikeService"

export default class AnswerService{

    public static async createAnswer(questionId : number, userId : number, description : string, source : string | null){
        
        const answer = await Answer.create({questionId, userId, description, source})
        await answer.save()
        return answer
    }

    public static async destroyAnswer(answerId : number, authId : number){

        const answer = await Answer.findOrFail(answerId)
        const questionId = answer.questionId

        if(answer.userId == authId){
            answer.delete()
        }

        return questionId

    }

    public static async countLikes(answer : Answer){
        
        await answer.load('answer_likes')

        let answer_likes = answer.answer_likes
        let likes = 0
        
        for(let answer_like of answer_likes){
            likes += answer_like.value
        }

        return likes
    }

    public static async getAnswerWithLikes(answer: Answer, userId: number){
        let likes = await AnswerService.countLikes(answer)
        let likeValue = await AnswerLikeService.getAnswerLikeValue(userId, answer.id)

        return Object.assign(answer, {likes, likeValue})
    }

}