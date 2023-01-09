import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AnswerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({}, [
      rules.trim(),
      rules.minLength(1),
      rules.maxLength(2048)
    ])
  })

  public messages = {
    'description.minLength' : 'A descrição deve ter no mínimo 1 caractere.',
    'description.maxLength' : 'A descrição deve ter no máximo 2048 caracteres.',
  }
}
