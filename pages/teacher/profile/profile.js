// pages/teacher/profile/profile.js
Page({
  data: {
    userInfo: {
      name: '李老师',
      phone: '13812345678',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      role: '篮球教练',
      kindergarten: '阳光幼儿园'
    },
    statistics: {
      totalStudents: 42,
      activeStudents: 38,
      totalEvents: 15,
      thisMonthEvents: 3,
      gradeDistribution: [
        { name: '小班', value: 15, color: '#3B82F6', percentage: 36 },
        { name: '中班', value: 12, color: '#10B981', percentage: 29 },
        { name: '大班', value: 15, color: '#FF7A2F', percentage: 36 }
      ],
      recentActivities: [
        { date: '2024-11', events: 3, students: 38 },
        { date: '2024-10', events: 5, students: 35 },
        { date: '2024-09', events: 4, students: 32 },
        { date: '2024-08', events: 3, students: 28 }
      ]
    }
  },

  onLoad() {
    // 加载用户信息和统计数据
    this.loadStatistics()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init()
    }
  },

  // 加载统计数据
  loadStatistics() {
    // 实际项目中从后端API获取数据
    // 这里使用模拟数据
  },

  // 编辑资料
  onEditProfile() {
    wx.showToast({ title: '编辑资料功能开发中', icon: 'none' })
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
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
  },

  // 导航方法
  navigateTo(e) {
    const page = e.currentTarget.dataset.page
    const urlMap = {
      'event': '/pages/teacher/event/event',
      'audit': '/pages/teacher/audit/audit',
      'student': '/pages/teacher/student/student',
      'profile': '/pages/teacher/profile/profile'
    }

    wx.redirectTo({
      url: urlMap[page]
    })
  },

  // 返回大厅
  backToHome() {
    wx.navigateBack({
      success: () => {
        // 返回成功
      },
      fail: () => {
        // 如果没有上一页，则跳转到大厅
        wx.redirectTo({
          url: '/pages/teacher/home/home'
        })
      }
    })
  }
})
