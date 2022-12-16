import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(100)
    ]),
    username: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(15)
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
      }),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.confirmed('password_confirmation'),
      rules.minLength(3),
    ]),
  })


  public messages = {
    'password.minLength': 'Mínimo de três caracteres',
    'email.unique': 'E-mail já cadastrado',
    'email': 'E-mail inválido',
  }
}
