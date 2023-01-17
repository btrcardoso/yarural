import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {

    public async index({ view }: HttpContextContract){
        return view.render('categories/index')
    }

}
