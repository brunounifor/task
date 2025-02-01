/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'
import HealthChecksController from '../app/healthChecksController.js'
import TaskController from '../app/TaskController.js'

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(
    router.toJSON(),
    // 'taskController.ts'.toJSON(), // for AdonisJS v6
    swagger
  )
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})

router
  .group(() => {
    router.post('/tasks', [TaskController, 'create'])
    router.get('/tasks', [TaskController, 'getAll'])
    router.get('/tasks/:id', [TaskController, 'getById'])
    router.put('/tasks/:id', [TaskController, 'update'])
    router.delete('/tasks/:id', [TaskController, 'delete'])
  })
  .prefix('/api')

router.get('/health', [HealthChecksController])
