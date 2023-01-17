import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {

    public async index({ view }: HttpContextContract){

        const categories = await Category.query().orderBy('name')

        return view.render('categories/index', {categories: categories})
    }

    public async show({ view }: HttpContextContract){

        return view.render('categories/show')
    }

}
