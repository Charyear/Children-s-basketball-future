// pages/teacher/event/event.js
Page({
  data: {
    activeTab: 0,
    tabs: ['全部赛事', '草稿中', '已发布', '进行中', '已结束'],
    eventList: [
      {
        id: 1,
        title: '小班篮球趣味赛',
        date: '2024-06-15 至 2024-06-16',
        location: '幼儿园室内篮球场',
        enrolled: 24,
        status: 'draft',
        statusText: '草稿中',
        statusColor: '#FF7A2F'
      },
      {
        id: 2,
        title: '中班篮球接力赛',
        date: '2024-05-20 至 2024-05-21',
        location: '幼儿园室外操场',
        enrolled: 36,
        status: 'published',
        statusText: '已发布',
        statusColor: '#10B981'
      },
      {
        id: 3,
        title: '大班篮球技巧赛',
        date: '2024-05-10 至 2024-05-11',
        location: '市体育中心篮球馆',
        enrolled: 48,
        status: 'ongoing',
        statusText: '进行中',
        statusColor: '#3B82F6'
      }
    ],
    filteredList: [],
    showEventModal: false,
    modalType: 'add'
  },

  onLoad() {
    this._filterList()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init()
    }
  },

  // 切换标签
  onTabChange(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ activeTab: index })
    this._filterList()
  },

  // 筛选列表
  _filterList() {
    const { activeTab, eventList, tabs } = this.data
    let filteredList = []
    
    if (activeTab === 0) {
      filteredList = eventList
    } else {
      const statusMap = ['', 'draft', 'published', 'ongoing', 'ended']
      filteredList = eventList.filter(item => item.status === statusMap[activeTab])
    }
    
    this.setData({ filteredList })
  },

  // 新建赛事
  onAddEvent() {
    wx.navigateTo({
      url: '/pages/teacher/eventEdit/eventEdit'
    })
  },

  // 编辑赛事
  onEditEvent(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/teacher/eventEdit/eventEdit?id=${id}`
    })
  },

  // 查看赛事
  onViewEvent(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/teacher/eventDetail/eventDetail?id=${id}`
    })
  },

  // 暂停通知
  onPauseEvent(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '暂停通知',
      content: '确定要暂停该赛事的通知吗？暂停后将不再向学员和家长推送相关消息。',
      confirmText: '确定暂停',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          // 实际项目中调用后端API暂停通知
          wx.showToast({
            title: '已暂停通知',
            icon: 'success'
          })
        }
      }
    })
  },

  // 发布赛事
  onPublishEvent(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要发布该赛事吗？',
      success: res => {
        if (res.confirm) {
          wx.showToast({ title: '赛事已发布', icon: 'success' })
        }
      }
    })
  },

  // 查看详情
  onViewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '查看详情: ' + id, icon: 'none' })
  },

  // 结束赛事
  onEndEvent(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要结束该赛事吗？',
      success: res => {
        if (res.confirm) {
          wx.showToast({ title: '赛事已结束', icon: 'success' })
        }
      }
    })
  },

  // 关闭弹窗
  onCloseModal() {
    this.setData({ showEventModal: false })
  },

  // 阻止触摸移动
  preventTouchMove() {
    return false
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
