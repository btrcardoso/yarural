import Answer from "App/Models/Answer"

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
        } else {
            console.error("Usuário não possui autorização para deletar a resposta.")
        }

        return questionId

    }

}