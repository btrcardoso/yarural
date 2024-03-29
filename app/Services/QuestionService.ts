import Question from "App/Models/Question"
import QuestionLikeService from "./QuestionLikeService"

export default class QuestionService {

    public static async createQuestion(question: string, description: string | null, userId: number, categoryId: number | null) {
    
        const quest = new Question()
        quest.question = question
        quest.description = description
        quest.userId = userId
        quest.categoryId = categoryId

        await quest.save()
        return quest
    }

    public static async destroyQuestion(id: number) {
        
        const quest = await Question.findOrFail(id)
        quest.delete()

    }

    public static async countLikes(question : Question){
        
        await question.load('question_likes')

        let question_likes = question.question_likes
        let likes = 0
        
        for(let question_like of question_likes){
            likes += question_like.value
        }

        return likes
    }

    public static async getQuestionWithLikes(question: Question, userId: number){
        let likes = await QuestionService.countLikes(question)
        let likeValue = await QuestionLikeService.getQuestionLikeValue(userId, question.id)

        return Object.assign(question, {likes, likeValue})
    }

}