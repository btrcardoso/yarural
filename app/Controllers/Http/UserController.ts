import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserService from 'App/Services/UserService'
import UserValidator from 'App/Validators/UserValidator'

export default class UserController {

    public async create({ view }: HttpContextContract) {
        return view.render('users/create')
    }

    public async store({ view, request }: HttpContextContract) {

        const data = await request.validate(UserValidator)

        const email =  data.email
        const password = data.password
        const name = data.name
        const username = data.username

        UserService.createUser(email,password, name, username)

        return view.render('users/profile')
    }

    public async show({ view }: HttpContextContract){
        return view.render('users/profile')
    }

}

