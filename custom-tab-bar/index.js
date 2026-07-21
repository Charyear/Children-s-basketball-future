// custom-tab-bar/index.js
Component({
  data: {
    active: 0,
    list: [],
    hidden: false  // 添加隐藏标志
  },

  lifetimes: {
    attached() {
      this.updateTabBar()
    }
  },

  pageLifetimes: {
    show() {
      this.checkIfShouldHide()
    }
  },

  methods: {
    checkIfShouldHide() {
      const page = getCurrentPages().pop()
      const route = page ? page.route : ''

      // 教师端页面不显示 tabBar
      const teacherPages = [
        'pages/teacher/event/event',
        'pages/teacher/audit/audit',
        'pages/teacher/student/student',
        'pages/teacher/profile/profile'
      ]

      this.setData({
        hidden: teacherPages.includes(route)
      })
    },

    updateTabBar() {
      const role = getApp().globalData.userRole || wx.getStorageSync('userRole') || 'parent'

      // 只为家长端设置 tabBar
      this.setData({
        list: [
          {
            pagePath: '/pages/parent/home/home',
            text: '首页赛事',
            iconPath: '/static/home.png',
            selectedIconPath: '/static/home_active.png'
          },
          {
            pagePath: '/pages/parent/enroll/enroll',
            text: '我的报名',
            iconPath: '/static/list.png',
            selectedIconPath: '/static/list_active.png'
          },
          {
            pagePath: '/pages/parent/history/history',
            text: '赛事回顾',
            iconPath: '/static/history.png',
            selectedIconPath: '/static/history_active.png'
          },
          {
            pagePath: '/pages/parent/profile/profile',
            text: '个人中心',
            iconPath: '/static/user.png',
            selectedIconPath: '/static/user_active.png'
          }
        ]
      })

      this.checkIfShouldHide()
    },

    onChange(e) {
      const index = e.currentTarget.dataset.index
      const item = this.data.list[index]

      if (!item || !item.pagePath) {
        console.error('Invalid tab item:', index, item)
        return
      }

      // tabBar 页面列表
      const tabBarPages = [
        '/pages/parent/home/home',
        '/pages/parent/enroll/enroll',
        '/pages/parent/history/history',
        '/pages/parent/profile/profile'
      ]

      if (tabBarPages.includes(item.pagePath)) {
        wx.switchTab({
          url: item.pagePath
        })
      } else {
        wx.navigateTo({
          url: item.pagePath,
          fail: () => {
            wx.redirectTo({
              url: item.pagePath
            })
          }
        })
      }
    },

    init() {
      const page = getCurrentPages().pop()
      const route = page ? `/${page.route}` : ''
      const active = this.data.list.findIndex(item => item.pagePath === route)

      this.setData({
        active: active === -1 ? 0 : active
      })
    }
  }
})
