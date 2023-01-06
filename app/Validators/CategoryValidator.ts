import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.alpha({
        allow: ['space']
      }),
      rules.minLength(2),
      rules.maxLength(15),
      rules.unique({table: 'categories', column: 'name'})
    ])
  })

  public messages = {
    'name.minLength' : 'O nome da categoria deve ter no mínimo 2 caracteres.',
    'name.maxLength' : 'O nome da categoria deve ter no máximo 15 caracteres.',
    'name.unique' : 'Esta categoria já existe.',
    'name.alpha': 'O nome da categoria só pode conter letras e espaço.'
  }
}
