import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AnswerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({}, [
      rules.trim(),
      rules.maxLength(2048)
    ]),
    source: schema.string.nullable({}, [
      rules.trim(),
    ])
  })

  public messages = {
    required: 'A descrição da resposta não pode ser vazia',
    'description.maxLength' : 'A descrição deve ter no máximo 2048 caracteres.',
  }
}
