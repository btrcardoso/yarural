import AnswerLike from "App/Models/AnswerLike"

export default class AnswerLikeService{

    public static async like(userId : number, answerId : number){
        const searchPayload = {userId, answerId}
        const persistancePayload = {value: 1}
        await AnswerLike.updateOrCreate(searchPayload, persistancePayload)
    }

    public static async dislike(userId : number, answerId : number){
        const searchPayload = {userId, answerId}
        const persistancePayload = {value: -1}
        await AnswerLike.updateOrCreate(searchPayload, persistancePayload)
    }

    public static async destroyAnswerLike(userId : number, answerId : number){
        await AnswerLike.query().where('answerId',answerId).where('userId', userId).delete()
    }

    public static async getAnswerLikeValue(userId : number, answerId : number){
        const answerLikes = await AnswerLike.query().where('answerId',answerId).where('userId', userId)
        return answerLikes[0] ? answerLikes[0].value : 0
    }

}