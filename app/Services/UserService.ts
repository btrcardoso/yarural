import User from "App/Models/User"
import Score from "App/Models/Score"
import Drive from "@ioc:Adonis/Core/Drive"

export default class UserService {

    public static async createUser(email: string, password: string, name: string, username: string) {
        let user = await User.findBy('email', email)

        if (user) {
            return user
        }
    
        user = new User()
        user.email = email
        user.password = password
        user.name = name
        user.username = username
        user.imageUrl = await Drive.getUrl('0.jpg')
    
        await user.save()
        return user
      }

      public static async changeScoreQuestion(user: User, type: string) {
        const score = await Score.findByOrFail('name', type)

        if (user.score >= Math.abs(score.value)) {
            user.score += score.value
            user.save()

            return true
        }
        else 
            return false
      }

      public static async changeScore(user: User, type: string) {
        const score = await Score.findByOrFail('name', type)

        if (score.value < 0) {
          if (user.score >= Math.abs(score.value)) {
            user.score += score.value
            user.save()
          }
          else {
            user.score = 0
            user.save()
          }
        }
        else {
          user.score += score.value
          user.save()
        }
      }

      public static async countQuestions(user: User) {
        await user.loadCount('questions')
        return user.$extras.questions_count
      }

      public static async countAnswers(user: User) {
        await user.loadCount('answers')
        return user.$extras.answers_count
      }

}