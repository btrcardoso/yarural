import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserService from 'App/Services/UserService'
import UserValidator from 'App/Validators/UserValidator'

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

    public async update({}: HttpContextContract){
        console.log("update here")
    }

}

