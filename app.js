// app.js
App({
  onLaunch() {
    // 小程序启动时执行
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    this.globalData.statusBarHeight = systemInfo.statusBarHeight
    this.globalData.navBarHeight = systemInfo.platform === 'ios' ? 44 : 48
    
    // 检查登录状态
    const token = wx.getStorageSync('token')
    if (token) {
      this.globalData.isLogin = true
    }
  },

  onShow() {
    // 小程序显示时执行
  },

  onHide() {
    // 小程序隐藏时执行
  },

  onError(msg) {
    console.error('小程序错误:', msg)
  },

  globalData: {
    userInfo: null,
    token: '',
    isLogin: false,
    systemInfo: null,
    statusBarHeight: 0,
    navBarHeight: 0,
    baseUrl: 'http://localhost:3000', // API基础地址（本地后端服务）
    userRole: '', // 用户角色: parent/teacher
  }
})
