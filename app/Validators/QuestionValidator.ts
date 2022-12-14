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
    description: schema.string.nullable({}, [
      rules.trim(),
      rules.maxLength(2048)
    ]),
    categoryId: schema.number([
      rules.exists({table:'categories', column:'id'})
    ])
  })

  public messages: CustomMessages = {
    required: 'O campo não pode ser vazio',
    'question.minLength' : 'A pergunta deve ter pelo menos 3 caracteres',
    'question.maxLength' : 'A pergunta deve ter no máximo 240 caracteres',
    'description.maxLength' : 'A descrição deve ter no máximo 2048 caracteres',
    'categoryId.exists' : 'Categoria inválida'
  }
}
