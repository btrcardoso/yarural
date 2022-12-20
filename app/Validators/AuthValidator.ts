import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim:true }, [
      rules.normalizeEmail({
        allLowercase: true,
      }),
      rules.exists({ table: 'users', column: 'email'})
    ]),
    password: schema.string({},[])
  })

  public messages = {
    required: 'Preencha o campo',
    'email.exists': 'E-mail inválido'
  }
}
