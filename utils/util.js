// utils/util.js
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 显示提示
const showToast = (title, icon = 'none') => {
  wx.showToast({
    title,
    icon,
    duration: 2000
  })
}

// 显示加载中
const showLoading = title => {
  wx.showLoading({
    title: title || '加载中...',
    mask: true
  })
}

// 隐藏加载中
const hideLoading = () => {
  wx.hideLoading()
}

// 页面跳转
const navigateTo = url => {
  wx.navigateTo({ url })
}

const redirectTo = url => {
  wx.redirectTo({ url })
}

const switchTab = url => {
  wx.switchTab({ url })
}

const navigateBack = () => {
  wx.navigateBack()
}

// 封装请求
const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.baseUrl + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // token过期，跳转登录
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
          redirectTo('/pages/login/login')
          reject(res)
        } else {
          reject(res)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = {
  formatTime,
  formatDate,
  showToast,
  showLoading,
  hideLoading,
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack,
  request
}
