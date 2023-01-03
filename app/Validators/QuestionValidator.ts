import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class QuestionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    question: schema.string({}, [
      rules.trim(),
      rules.minLength(3),
      rules.maxLength(240),
    ]),
    description: schema.string.nullableAndOptional({}, [
      rules.trim(),
      rules.maxLength(2048)
    ])
  })

  public messages: CustomMessages = {
    required: 'A pergunta não pode ser vazia',
    'question.minLength' : 'A pergunta deve ter pelo menos 3 caracteres',
    'question.maxLenght' : 'A pergunta deve ter no máximo 240 caracteres',
    'description.maxLenght' : 'A descrição deve ter no máximo 2048 caracteres'
  }
}
