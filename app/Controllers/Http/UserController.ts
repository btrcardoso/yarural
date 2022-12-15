import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class UserController {

    public create({ view }: HttpContextContract) {
        return view.render('users/create')
    }

    public store({ view, request }: HttpContextContract) {

       const email =  request.input('email')
       const password = request.input('password')

        UserService.createUser(email,password)

        return view.render('auth/profile')
    }

}

