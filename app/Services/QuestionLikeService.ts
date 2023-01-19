import QuestionLike from "App/Models/QuestionLike"

export default class QuestionLikeService{

    public static async createQuestionLike(userId : number, questionId : number, value : 1 | -1){
        const questionLike = await QuestionLike.create({userId, questionId, value})
        await questionLike.save()
        return questionLike
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