import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

    public async index({ auth, view }: HttpContextContract){
        if (auth.use('web').isLoggedIn){
            return view.render('home/loggedInHome')
        }
        else{
            return view.render('home/notLoggedInHome')
        }
    }

}


