const Service = require('egg').Service
const moment = require('moment')
moment.locale('zh-cn')
class NewsService extends Service {
  // 获取天气
  async getWeather(area) {
    const url = `https://weatherquery.api.bdymkt.com/weather/query/by-area?area=${area}`

    const res = await this.ctx.curl(`${url}`, {
      // 必须指定 method
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Bce-Signature': 'AppCode/0882b60e7ad44606be17ecefcf76bcfd'
      },
      dataType: 'json',
      data: {
        area,
        areaId: area
      }
    })
    const day = moment(new Date()).diff('2022-05-01', 'day')
    const birthday = moment('2023-03-23').diff(new Date(), 'day')

    console.log('day', day)

    // console.log('res-------', res)
    // console.log('res.data.now-------', res.data.data.now)
    // console.log('res-------', res.data.data.dayWeathers)
    return {
      day,
      birthday,
      ...res.data.data.dayWeathers[0],
      aqi: res.data.data.now.aqi,
      temperature: res.data.data.now.temperature,
      date: moment(new Date()).format('YYYY-MM-DD dddd'),
      weather: res.data.data.now.weather,
      sd: res.data.data.now.sd
    }
  }
  // 获取情话
  async getLoveWords() {
    const url = `https://api.vvhan.com/api/love?type=json`

    const res = await this.ctx.curl(`${url}`, {
      // 必须指定 method
      method: 'GET',
      dataType: 'json'
    })

    console.log('res------', res.data.ishan)
    return res.data.ishan
  }

  // 获取星座
  async getConstellation() {
    const url = `https://api.vvhan.com/api/horoscope?type=aries&time=today`

    const res = await this.ctx.curl(`${url}`, {
      // 必须指定 method
      method: 'GET',
      dataType: 'json'
    })

    return res.data.data
  }
}

module.exports = NewsService
