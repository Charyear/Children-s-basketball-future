// pages/teacher/home/home.js
Page({
  data: {
    showCards: false
  },

  onLoad() {
    // 页面加载后延迟显示卡片，创造从中心缩放的效果
    setTimeout(() => {
      this.setData({ showCards: true })
    }, 100)
  },

  onShow() {
    // 从其他页面返回时重新播放动画
    this.setData({ showCards: false })
    setTimeout(() => {
      this.setData({ showCards: true })
    }, 50)
  },

  // 导航到指定页面
  navigateToPage(e) {
    const page = e.currentTarget.dataset.page
    const position = e.currentTarget.dataset.position

    const urlMap = {
      'event': '/pages/teacher/event/event',
      'audit': '/pages/teacher/audit/audit',
      'student': '/pages/teacher/student/student',
      'profile': '/pages/teacher/profile/profile'
    }

    // 先隐藏卡片（缩放回中心）
    this.setData({ showCards: false })

    // 延迟导航，等待动画完成
    setTimeout(() => {
      wx.navigateTo({
        url: `${urlMap[page]}?from=home`
      })
    }, 300)
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('userRole')
          const app = getApp()
          app.globalData.isLogin = false
          app.globalData.userRole = ''
          app.globalData.token = ''
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})
