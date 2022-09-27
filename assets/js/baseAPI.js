/*
 * @Author: sharon simapingguo1@163.com
 * @Date: 2022-09-23 16:29:58
 * @LastEditors: sharon simapingguo1@163.com
 * @LastEditTime: 2022-09-27 16:58:03
 * @FilePath: \大事件\assets\js\baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
//会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  //在发起真正的Ajax请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url

  //统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }


  //全局统一挂载 complete 回调函数
  options.complete = function (res) {
    // console.log(res)
    //在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //1、强制清空 token
      localStorage.removeItem('token')
      //2、强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})