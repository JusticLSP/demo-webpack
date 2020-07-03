// 导入配置关键字/描述
import $ from 'jquery'

// 将jquery挂载到window上
window.$ = $

// 导入样式
import './css/reset.css'
import './css/main.css'
import './css/nav.css'
import 'bootstrap/dist/css/bootstrap.css'

// 网站关键字/描述
$('[name="description"]')[0].content = ''
$('[name="keywords"]')[0].content = ''
