import User from "App/Models/User"

export default class UserService {

    public static async createUser(email: string, password: string) {
        let user = await User.findBy('email', email)

        if (user) {
            return user
        }
    
        user = new User()
        user.email = email
        user.password = password
    
        await user.save()
        return user
      }

}