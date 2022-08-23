'use strict'

const Controller = require('egg-cloud').Controller

class SendMsgController extends Controller {
  async send() {
    const ctx = this.ctx
   
    const data = await ctx.service.sendMsg.sendOut()
    
  }
}

module.exports = SendMsgController
