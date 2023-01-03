import Question from "App/Models/Question"

export default class QuestionService {

    public static async createQuestion(question: string, description: string | null) {
    
        const quest = new Question()
        quest.question = question
        quest.description = description

        await quest.save()
        return quest
    }

    public static async destroyQuestion(id: number) {
        
        const quest = await Question.findOrFail(id)
        quest.delete()

    }

}