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

    public static async destroyQuestionLike(questionLikeId : number, authId : number){
        const questionLike = await QuestionLike.findOrFail(questionLikeId)

        if(questionLike.userId == authId){
            questionLike.delete()
        } else {
            console.error("Usuário não possui autorização para deletar a curtida na pergunta.")
        }
    }

}