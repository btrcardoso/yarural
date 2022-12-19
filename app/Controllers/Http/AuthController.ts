import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {

    public async create({ view }: HttpContextContract){
        return view.render('auth/login')
    }

    public async store({auth, request, response, session}: HttpContextContract){

        const data = await request.validate(AuthValidator)

        try{
            await auth.use('web').attempt(data.email, data.password)
        } catch {
            session.flash({
                "email": data.email,
                "errors": {
                  "password": [
                    'Senha incorreta'
                  ]
                }
            })
            return response.redirect().toRoute('auth.create')
        }

        return response.redirect().toRoute('home.index')
    }

    public async destroy({ auth, response }: HttpContextContract){
        await auth.use('web').logout()
        return response.redirect().toRoute('auth.create')
    }

}
