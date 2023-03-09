import Drive from '@ioc:Adonis/Core/Drive'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        name: 'Administrador',
        email: 'admin@admin.com',
        username: 'admin',
        password: 'focafoca',
        imageUrl: '/uploads/0.jpg'
      },
      {
        name: 'Sullyvan',
        email: 'sullyvan@admin.com',
        username: 'sullyvan',
        password: '123',
        imageUrl: '/uploads/0.jpg'
      },
    ])
  }
}
