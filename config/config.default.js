'use strict'

exports.rpc = {
  // registry: {
  //   address: '127.0.0.1:2181',
  // },
  // client: {},
  // server: {},
}

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks'
  }
}

exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0'
}
