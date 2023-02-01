import User from "App/Models/User"
import Score from "App/Models/Score"

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
    
        await user.save()
        return user
      }

      public static async changeScore(user: User, type: string) {
        const score = await Score.findByOrFail('name', type)

        if (user.score >= Math.abs(score.value)) {
            user.score += score.value
            user.save()

            return true
        }
        else 
            return false
      }

}