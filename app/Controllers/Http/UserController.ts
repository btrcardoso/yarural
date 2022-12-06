import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserController {

    public create({ view }: HttpContextContract) {
        return view.render('users/create')
    }
    
}

