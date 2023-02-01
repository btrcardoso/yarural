/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UserController.create').as('create')
  Route.post('/', 'UserController.store').as('store')
})
  .prefix('/cadastro')
  .as('user')

Route.group(()=>{
  Route.get('/perfil/ya/:username', 'UserController.show').as('user.show')
  Route.get('/perfil/ya/:username/respostas', 'UserController.showAnswers').as('user.showAnswers')
  Route.get('/perfil/editar', 'UserController.edit').as('user.edit')
  Route.post('/perfil/editar', 'UserController.update').as('user.update')
}).middleware('auth:web')

Route.group(() => {
  Route.get('/login', 'AuthController.create').as('create')
  Route.post('/login', 'AuthController.store').as('store')
  Route.get('/logout', 'AuthController.destroy').as('destroy')
}).as('auth')

Route.get('/', 'HomeController.index').as('home.index').middleware('silentAuth')

Route.group(() => {
  Route.get('/perguntar', 'QuestionsController.create').as('question.create')
  Route.post('/perguntar', 'QuestionsController.store').as('question.store')
  Route.get('/pergunta/:id', 'QuestionsController.show').as('question.show')
  Route.get('/pergunta/:id/delete', 'QuestionsController.destroy').as('question.destroy')
}).middleware('auth')

Route.group(() => {
  Route.post('/responder/:id', 'AnswersController.store').as('answer.store')
  Route.get('/resposta/:id/delete', 'AnswersController.destroy').as('answer.destroy')
})

Route.group(() => {
  Route.get('/', 'CategoriesController.index').as('index')
  Route.get('/:id', 'CategoriesController.show').as('show')
}).prefix('/categorias').as('category').middleware('auth')

Route.get('/ranking', 'UserController.rank').as('user.rank')