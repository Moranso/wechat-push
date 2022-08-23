const moment = require('moment')
const Service = require('egg').Service

class SengMsgService extends Service {
  async sendOut() {
    const { ctx, app } = this;

    const token = await this.getToken()

    const users = ['oO8y75x_2ntpfxsocqI7fdnJrZBw', 'oO8y75x9-iyjSjcksCBMO_aqD5mY']

    const data = await this.getTempData()

    this.ctx.logger.info('--------------data-----------------------------------------------', data)
    const promise = users.map(id => {
      data.touser = id
      return this.toWechat(token, data)
    })



    const results = await Promise.all(promise);
    return results
  }

  // 获取token
  async getToken() {
    const { app, ctx } = this;

    const appId = app.config.wechat.appId
    const secret = app.config.wechat.secret

    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`

    const result = await ctx.curl(url, {
      method: 'get',
      dataType: 'json',
    });

    if (result.status === 200) {
      return result.data.access_token;
    }
  }

  // 发送微信消息
  async toWechat(token, data) {
    // 模板消息接口文档
    const url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + token;
    const result = await this.ctx.curl(url, {
      method: 'POST',
      data,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.ctx.logger.info('--------------result-----------------------------------------------%j', result)

    return result;
  }

  async getBirthday() {
    const birthday = moment('2023-04-03').diff(new Date(), 'day')
    return birthday
  }

  async getWeDay() {
    const weDay = moment(new Date()).diff('2022-05-01', 'day')
    return weDay
  }

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

    return {
      ...res.data.data.dayWeathers[0],
      // 空气质量
      aqi: res.data.data.now.aqi,
      // 当前温度
      temperature: res.data.data.now.temperature,
      // 今日日期
      date: moment(new Date()).format('YYYY-MM-DD dddd'),
      // 天气
      weather: res.data.data.now.weather,
      // 湿度
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

  async getTempData() {
    const weather = await this.getWeather('成都')
    const loveWord = await this.getLoveWords()
    const xingzuo = await this.getConstellation()
    const birthday = await this.getBirthday()
    const day = await this.getWeDay()

    const data = {
      topcolor: '#FF0000',
      template_id: 'RY2W-hlaf09msm5ezzp-W76-r3nQFiaccoDiyDPTJKo',
      data: {
        // 当前日期
        currentDate: {
          value: weather.date,
          color: '#47cedf'
        },
        // 天气
        weather: {
          value: weather.weather,
          color: '#fda8a8'
        },
        // 当前温度
        temperature: {
          value: weather.temperature,
          color: '#fdcbb3'
        },
        // 最低温度
        night_low_temperature: {
          value: weather.night_low_temperature,
          color: '#ff758e'
        },
        // 湿度
        sd: {
          value: weather.sd,
          color: '#667eea',
        },
        // 空气质量：
        aqi: {
          value: weather.aqi,
          color: '#fdcbb3',
        },
        // 在一起天数
        day: {
          value: day,
          color: '#fda8a8',
        },
        // 生日
        birthday: {
          value: birthday,
          color: '#99b86e',
        },
        // 情话
        loveWord: {
          value: loveWord,
          color: '#fbb4bd',
        },
        xingzuoTitle: {
          value: xingzuo.title,
          color: '#ffbca9',
        },
        luckyColor: {
          value: xingzuo.luckycolor,
          color: '#ee6561',
        },
        luckyNumber: {
          value: xingzuo.luckynumber,
          color: '#a1c4fd',
        },
        // 短评
        shortComment: {
          value: xingzuo.shortcomment,
          color: '#99b86e',
        },
        // 运势解析
        fortunetext: {
          value: xingzuo.fortunetext.all,
          color: '#8bace8',
        },
      },
    };

    return data
  }

}

module.exports = SengMsgService