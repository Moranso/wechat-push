'use strict'

const Controller = require('egg-cloud').Controller

class HomeController extends Controller {
  async home() {
    const ctx = this.ctx
    const area = '成都'
    const data = await ctx.service.home.getWeather(area)
    const loveWord = await ctx.service.home.getLoveWords()
    const xingzuo = await ctx.service.home.getConstellation()
    console.log('xingzuo', xingzuo)
    await ctx.render('news/index.tpl', { data: { ...data, loveWord, xingzuo } })
  }
}

module.exports = HomeController
