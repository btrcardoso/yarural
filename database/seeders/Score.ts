import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Score from 'App/Models/Score'

export default class extends BaseSeeder {
  public async run () {
    
    const uniqueKey = 'name'

    await Score.updateOrCreateMany(uniqueKey, [
      {
        name: 'makeQuestion',
        value: -5
      },
      {
        name: 'vote',
        value: 1
      },
      {
        name: 'removeVote',
        value: -1
      },
      {
        name: 'answer',
        value: 2
      },
      {
        name: 'removeAnswer',
        value: -2
      },
      {
        name: 'receiveLike',
        value: 1
      },
      {
        name: 'removedLike',
        value: -1
      },
      {
        name: 'receiveDislike',
        value: -1
      },
      {
        name: 'removedDislike',
        value: 1
      },

    ])
  }
}
