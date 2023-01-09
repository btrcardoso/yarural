import Answer from "App/Models/Answer"

export default class AnswerService{

    public static async createAnswer(questionId : number, userId : number, description : string, source : string | null){
        const answer = await Answer.create({questionId, userId, description, source})
        await answer.save()
        return answer
    }

    public static async destroy(id : number){
        const answer = await Answer.findOrFail(id)
        answer.delete()
    }

}