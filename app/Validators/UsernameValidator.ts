import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsernameValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(100),
    ]),
    username: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(15),
    ]),
    description: schema.string.nullable([
      rules.trim(),
      rules.maxLength(500)
    ])
  })

  public messages: CustomMessages = {
    required: 'O campo não pode ficar vazio',
    'name.minLength': 'Nome deve ter pelo menos 3 letras',
    'name.maxLength': 'Nome não pode ter mais de 100 letras',
    'description.maxLength': 'Máximo de 500 caracteres',
    'username.minLength': 'Username deve ter pelo menos 3 letras',
    'username.maxLength': 'Username não pode ter mais de 15 letras',
    'username.unique': 'Username já cadastrado',
  }
}
