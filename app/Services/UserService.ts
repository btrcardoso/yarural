import User from "App/Models/User"

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

}