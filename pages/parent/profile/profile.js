// pages/parent/profile/profile.js
const app = getApp()

Page({
  data: {
    userInfo: {
      name: '张爸爸',
      id: '138****5678',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    },
    children: [
      {
        id: 1,
        name: '张小明',
        age: '5岁',
        class: '小一班',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'
      }
    ],
    menuList: [
      { icon: 'icon-bell', name: '系统通知', badge: 3, color: '#FF7A2F', bgColor: '#FFF3E8' },
      { icon: 'icon-history', name: '我的参赛记录', badge: 0, color: '#3B82F6', bgColor: '#EFF6FF' },
      { icon: 'icon-certificate', name: '获奖证书', badge: 0, color: '#10B981', bgColor: '#ECFDF5' }
    ],
    settingList: [
      { icon: 'icon-shield', name: '账号安全', color: '#6B7280' },
      { icon: 'icon-help', name: '帮助中心', color: '#6B7280' },
      { icon: 'icon-info', name: '关于我们', color: '#6B7280' },
      { icon: 'icon-logout', name: '退出登录', color: '#EF4444' }
    ],
    showAddChildModal: false,
    childForm: {
      name: '',
      age: '',
      gender: '',
      kindergarten: '',
      grade: ''
    }
  },

  onLoad() {
    // 加载用户信息
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init()
    }
  },

  // 添加孩子
  onAddChild() {
    this.setData({
      showAddChildModal: true,
      childForm: {
        name: '',
        age: '',
        gender: '',
        kindergarten: '',
        grade: ''
      }
    })
  },

  // 关闭添加孩子弹窗
  onCloseAddChildModal() {
    this.setData({
      showAddChildModal: false,
      childForm: {
        name: '',
        age: '',
        gender: '',
        kindergarten: '',
        grade: ''
      }
    })
  },

  // 表单输入
  onChildFormInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`childForm.${field}`]: e.detail.value
    })
  },

  // 选择性别
  onSelectGender(e) {
    const gender = e.currentTarget.dataset.gender
    this.setData({
      'childForm.gender': gender
    })
  },

  // 确认添加孩子
  onConfirmAddChild() {
    const { name, age, gender, kindergarten, grade } = this.data.childForm

    if (!name || !age || !gender || !kindergarten || !grade) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    // 实际项目中调用后端API添加孩子
    const newChild = {
      id: this.data.children.length + 1,
      name,
      age: age + '岁',
      class: `${kindergarten} ${grade}`,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'
    }

    this.setData({
      children: [...this.data.children, newChild]
    })

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })

    this.onCloseAddChildModal()
  },

  // 菜单点击
  onMenuTap(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({ title: name, icon: 'none' })
  },

  // 设置项点击
  onSettingTap(e) {
    const name = e.currentTarget.dataset.name
    if (name === '账号安全') {
      wx.showToast({ title: '账号安全设置', icon: 'none' })
    } else if (name === '帮助中心') {
      wx.showToast({ title: '帮助中心', icon: 'none' })
    } else if (name === '关于我们') {
      wx.showModal({
        title: '关于我们',
        content: '童篮未来 v1.0.0\n幼儿篮球赛事服务平台',
        showCancel: false
      })
    } else if (name === '退出登录') {
      this.onLogout()
    }
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
          app.globalData.isLogin = false
          app.globalData.userRole = ''
          app.globalData.token = ''
          wx.reLaunch({ url: '/pages/login/login' })
        }
      }
    })
  },

  // 阻止触摸移动
  preventTouchMove() {
    return false
  }
})
