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
  Route.get('/perfil', 'UserController.show').as('user.show')
  Route.get('/perfil/editar', 'UserController.edit').as('user.edit')
  Route.post('/perfil/editar', 'UserController.update').as('user.update')
}).middleware('auth:web')

// Conferir se o login é pra estar no AuthController ou UserController
Route.group(() => {
  Route.get('/login', 'AuthController.create').as('create')
  Route.post('/login', 'AuthController.store').as('store')
  Route.get('/logout', 'AuthController.destroy').as('destroy')
}).as('auth')

Route.get('/', 'HomeController.index').as('home.index').middleware('silentAuth')

Route.get('/perguntar', 'QuestionsController.create').as('question.create').middleware('auth')
Route.post('/perguntar', 'QuestionsController.store').as('question.store').middleware('auth')