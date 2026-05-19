// holiday.js - 节日倒计时脚本
// 最后更新：2026-01-15

var holidays = [
  { name: "元旦", month: 1, day: 1 },
  { name: "春节", month: 2, day: 17 },
  { name: "清明", month: 4, day: 5 },
  { name: "劳动节", month: 5, day: 1 },
  { name: "端午", month: 6, day: 19 },
  { name: "中秋", month: 9, day: 25 },
  { name: "国庆", month: 10, day: 1 },
  { name: "高考", month: 6, day: 7 },
  { name: "七夕", month: 8, day: 25 },
  { name: "儿童节", month: 6, day: 1 },
  { name: "妇女节", month: 3, day: 8 },
  { name: "植树节", month: 3, day: 12 }
]

function getDays(m, d) {
  var now = new Date()
  var target = new Date(now.getFullYear(), m - 1, d)
  if (target < now) {
    target = new Date(now.getFullYear() + 1, m - 1, d)
  }
  return Math.floor((target - now) / 86400000)
}

var list = []
for (var i = 0; i < holidays.length; i++) {
  var days = getDays(holidays[i].month, holidays[i].day)
  if (days >= 0 && days <= 90) {
    list.push({ name: holidays[i].name, days: days })
  }
}
list.sort(function(a, b) { return a.days - b.days })

var col1 = [], col2 = [], col3 = []
for (var i = 0; i < list.length; i++) {
  var suffix = list[i].days === 0 ? "今天" : list[i].days + "天"
  var text = list[i].name + " " + suffix
  if (i % 3 === 0) col1.push(text)
  else if (i % 3 === 1) col2.push(text)
  else col3.push(text)
}

var maxLen1 = 0, maxLen2 = 0
for (var i = 0; i < col1.length; i++) {
  if (col1[i].length > maxLen1) maxLen1 = col1[i].length
}
for (var i = 0; i < col2.length; i++) {
  if (col2[i].length > maxLen2) maxLen2 = col2[i].length
}

var msg = ""
var rowCount = Math.max(col1.length, col2.length, col3.length)
for (var i = 0; i < rowCount; i++) {
  var c1 = i < col1.length ? col1[i] : ""
  var c2 = i < col2.length ? col2[i] : ""
  var c3 = i < col3.length ? col3[i] : ""
  while (c1.length < maxLen1) c1 = c1 + " "
  while (c2.length < maxLen2) c2 = c2 + " "
  msg = msg + c1 + "    " + c2 + "    " + c3 + "\n"
}

$notification.post("倒数日：", "", msg)
