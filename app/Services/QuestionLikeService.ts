import QuestionLike from "App/Models/QuestionLike"

export default class QuestionLikeService{

    public static async like(userId : number, questionId : number){
        const searchPayload = {userId, questionId}
        const persistancePayload = {value: 1}
        await QuestionLike.updateOrCreate(searchPayload, persistancePayload)
    }

    public static async dislike(userId : number, questionId : number){
        const searchPayload = {userId, questionId}
        const persistancePayload = {value: -1}
        await QuestionLike.updateOrCreate(searchPayload, persistancePayload)
    }

    public static async destroyQuestionLike(userId : number, questionId : number){
        await QuestionLike.query().where('questionId',questionId).where('userId', userId).delete()
    }

    public static async getQuestionLikeValue(userId : number, questionId : number){
        const questionLikes = await QuestionLike.query().where('questionId',questionId).where('userId', userId)
        return questionLikes[0] ? questionLikes[0].value : 0
    }

    // talvez seja desnecessario, entao apagar
    // public static async destroyQuestionLikeById(questionLikeId : number, authId : number){
    //     const questionLike = await QuestionLike.findOrFail(questionLikeId)

    //     if(questionLike.userId == authId){
    //         questionLike.delete()
    //     } else {
    //         console.error("Usuário não possui autorização para deletar a curtida na pergunta.")
    //     }
    // }

}