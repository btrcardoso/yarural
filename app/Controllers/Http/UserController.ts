import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserService from 'App/Services/UserService'
import User from 'App/Models/User'
import ProfileValidator from 'App/Validators/ProfileValidator'
import UserValidator from 'App/Validators/UserValidator'
import UsernameValidator from 'App/Validators/UsernameValidator'

export default class UserController {

    public async create({ view }: HttpContextContract) {
        return view.render('user/create')
    }

    public async store({ request, response }: HttpContextContract) {

        const data = await request.validate(UserValidator)

        const email =  data.email
        const password = data.password
        const name = data.name
        const username = data.username

        UserService.createUser(email,password, name, username)

        return response.redirect().toRoute('user.show')
    }

    public async show({ view }: HttpContextContract){
        return view.render('user/profile')
    }

    public async edit({ view }: HttpContextContract){
        return view.render('user/edit')
    }

    public async update({auth, request, response}: HttpContextContract){

        const user = await User.findOrFail(auth.user?.id)

        const inputUsername = request.input('username')
        
        var data: {
            name: string;
            username: string;
            description: string | null;
        };

        if(inputUsername != user.username) {
            data = await  request.validate(ProfileValidator)
        }
        else {
            data = await request.validate(UsernameValidator)
        }

        user.name = data.name
        user.username = data.username
        user.description = data.description

        user.save()

        return response.redirect().toRoute('user.show')

    }
}

