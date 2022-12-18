import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(100),
    ]),
    description: schema.string.optional([
      rules.trim(),
      rules.maxLength(500)
    ])
  })

  public messages: CustomMessages = {
    'name.minLength': 'Nome deve ter pelo menos 3 letras',
    'name.maxLength': 'Nome não pode ter mais de 100 letras',
    'description.maxLength': 'Máximo de 500 caracteres',
  }
}
