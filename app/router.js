'use strict'

module.exports = app => {
  const { router, controller } = app

  router.get('/', controller.home.home)
  router.get('/send', controller.sendMsg.send)

}
