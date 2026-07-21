// pages/login/login.js
const app = getApp()

Page({
  data: {
    username: '',
    password: '',
    showPassword: false,
    loading: false,
    showRoleSelect: false,
    agreeTerms: false
  },

  onLoad() {
    if (app.globalData.isLogin && app.globalData.userRole) {
      this._redirectByRole(app.globalData.userRole)
    }
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  togglePassword() {
    this.setData({ showPassword: !this.data.showPassword })
  },

  toggleAgree() {
    this.setData({ agreeTerms: !this.data.agreeTerms })
  },

  doLogin() {
    const { username, password, agreeTerms } = this.data

    if (!username.trim()) {
      wx.showToast({ title: '请输入账号', icon: 'none' })
      return
    }
    if (!password.trim()) {
      wx.showToast({ title: '请输入密码', icon: 'none' })
      return
    }
    if (!agreeTerms) {
      wx.showModal({
        title: '提示',
        content: '请先阅读并同意《用户协议》和《隐私政策》',
        showCancel: false,
        confirmText: '我知道了'
      })
      return
    }

    this.setData({ loading: true })

    setTimeout(() => {
      this.setData({ loading: false, showRoleSelect: true })
    }, 1500)
  },

  selectRole(e) {
    const role = e.currentTarget.dataset.role
    const token = 'mock_token_' + Date.now()

    wx.setStorageSync('token', token)
    wx.setStorageSync('userRole', role)
    app.globalData.isLogin = true
    app.globalData.userRole = role
    app.globalData.token = token

    this._redirectByRole(role)
  },

  _redirectByRole(role) {
    switch (role) {
      case 'parent':
        wx.reLaunch({ url: '/pages/parent/home/home' })
        break
      case 'teacher':
        wx.reLaunch({ url: '/pages/teacher/home/home' })
        break
    }
  },

  closeRoleSelect() {
    this.setData({ showRoleSelect: false })
  },

  forgetPassword() {
    wx.showToast({ title: '请联系管理员重置密码', icon: 'none' })
  },

  contactAdmin() {
    wx.showToast({ title: '客服电话: 400-xxx-xxxx', icon: 'none' })
  },

  goRegister() {
    wx.showToast({ title: '注册功能开发中', icon: 'none' })
  },

  preventTouchMove() {
    return false
  }
})
