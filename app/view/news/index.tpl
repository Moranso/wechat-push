<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/index.css" />
  </head>
  <body>
    <div class="weather">
      <div class="date">
        {{data.date}}
      </div>
      <div>
        <label>天气：</label> <span class="date">{{data.weather}}</span>
      </div>
      <div>
        <label>当前温度：</label><span class="hei-weather">{{data.temperature}}度</span>
      </div>
      <div>
        <label>最低温度：</label><span class="zdwd">{{data.night_low_temperature}}度</span>
      </div>
      <div>
       <label>湿度：</label> <span class="sd">{{data.sd}}</span>
      </div>
      <div>
       <label>空气质量：</label><span class="kqzl">{{data.aqi}}</span>
      </div>
      <div>
        <label>今天是我们在一起的第</label><span class="day">{{data.day}}</span><label>天</label>
      </div>
      <div>
        <label>距离宝贝的生日还有</label><span class="birthday">{{data.birthday}}</span><label>天</label>
      </div>

      <div class="loveWord">
       {{data.loveWord}}
      </div>

      <div class="xingzuo">
        <div class="title1">{{data.xingzuo.title}}</div>

        <div><label>幸运颜色：</label><span class="luckycolor">{{data.xingzuo.luckycolor}}</span></div>
        <div><label>幸运数字：</label><span class="luckynumber">{{data.xingzuo.luckynumber}}</span></div>
        <div><label>短评：</label><span class="shortcomment">{{data.xingzuo.shortcomment}}</span></div>
        <div><label>运势解析：</label><span class="fortunetext">{{data.xingzuo.fortunetext.all}}</span></div>
      </div>
    </div>


  </body>
</html>