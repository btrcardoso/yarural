import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run () {
    
    const uniqueKey = 'name'

    await Category.updateOrCreateMany(uniqueKey, [
      {
        name: 'Secretaria'
      },
      {
        name: 'Bandeijão'
      }, 
      {
        name: 'Matrícula'
      },
      {
        name: 'Outros'
      },
      {
        name: 'Matérias'
      },
      {
        name: 'TCC'
      },
      {
        name: 'Iniciação Científica'
      },
      {
        name: 'PPC'
      },
      {
        name: 'Horas Complementares'
      },
      {
        name: 'Faltas'
      }
    ])
  }
}
