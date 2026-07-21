// pages/parent/enroll/enroll.js
Page({
  data: {
    activeTab: 0,
    tabs: ['全部赛事', '待审核', '已通过', '已拒绝', '已取消', '已结束'],
    enrollList: [
      {
        id: 1,
        title: '2024春季幼儿篮球嘉年华',
        date: '2024-05-18 09:00 - 12:00',
        location: '市体育中心篮球馆',
        child: '小明（4岁）',
        status: 'pending',
        statusText: '待审核',
        statusColor: '#F59E0B',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'
      },
      {
        id: 2,
        title: '幼儿园篮球趣味挑战赛',
        date: '2024-06-01 14:00 - 17:00',
        location: '第一幼儿园室内运动场',
        child: '小明（4岁）',
        status: 'approved',
        statusText: '已通过',
        statusColor: '#10B981',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400'
      },
      {
        id: 3,
        title: '趣味篮球嘉年华',
        date: '2024-06-15 10:00 - 12:00',
        location: '青少年活动中心',
        child: '小明（4岁）',
        status: 'approved',
        statusText: '已通过',
        statusColor: '#10B981',
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400'
      }
    ],
    filteredList: [],
    showEnrollDetail: false,
    selectedItem: {},
    detailTranslateY: 0,
    detailStartY: 0
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
    const { activeTab, enrollList, tabs } = this.data
    let filteredList = []

    if (activeTab === 0) {
      filteredList = enrollList
    } else if (activeTab === 5) {
      // 已结束：筛选出举办时间早于当前时间的赛事
      const now = new Date().getTime()
      filteredList = enrollList.filter(item => {
        const eventDate = this._parseEventDate(item.date)
        return eventDate && eventDate < now
      })
    } else {
      const statusMap = ['', 'pending', 'approved', 'rejected', 'cancelled']
      filteredList = enrollList.filter(item => item.status === statusMap[activeTab])
    }

    this.setData({ filteredList })
  },

  // 解析赛事时间字符串为时间戳
  _parseEventDate(dateStr) {
    if (!dateStr) return null
    // 提取结束时间，格式如 "2024-05-18 09:00 - 12:00"
    const match = dateStr.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/)
    if (match) {
      const datePart = match[1].split(' ')[0]
      const endTime = match[2]
      const endDateStr = `${datePart} ${endTime}`
      return new Date(endDateStr).getTime()
    }
    return null
  },

  // 查看详情
  onViewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '查看赛事详情: ' + id, icon: 'none' })
  },

  // 显示报名详情
  onShowEnrollDetail(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      showEnrollDetail: true,
      selectedItem: item,
      detailTranslateY: 0
    })
  },

  // 关闭报名详情
  onCloseEnrollDetail() {
    this.setData({
      showEnrollDetail: false,
      detailTranslateY: 0
    })
  },

  // 详情页触摸开始
  onDetailTouchStart(e) {
    this.setData({
      detailStartY: e.touches[0].clientY
    })
  },

  // 详情页触摸移动
  onDetailTouchMove(e) {
    const moveY = e.touches[0].clientY - this.data.detailStartY
    if (moveY > 0) {
      this.setData({
        detailTranslateY: moveY
      })
    }
  },

  // 详情页触摸结束
  onDetailTouchEnd(e) {
    if (this.data.detailTranslateY > 100) {
      this.onCloseEnrollDetail()
    } else {
      this.setData({
        detailTranslateY: 0
      })
    }
  },

  // 从详情页重新报名
  onReEnroll(e) {
    this.setData({
      showEnrollDetail: false,
      detailTranslateY: 0
    })
    wx.showToast({ title: '立即报名功能开发中', icon: 'none' })
  },

  // 从详情页取消报名
  onCancelEnrollFromDetail(e) {
    const id = this.data.selectedItem.id
    wx.showModal({
      title: '提示',
      content: '确定要取消报名吗？',
      success: res => {
        if (res.confirm) {
          this.setData({
            showEnrollDetail: false,
            detailTranslateY: 0
          })
          wx.showToast({ title: '已取消报名', icon: 'success' })
        }
      }
    })
  },

  // 取消报名
  onCancelEnroll(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要取消报名吗？',
      success: res => {
        if (res.confirm) {
          wx.showToast({ title: '已取消报名', icon: 'success' })
        }
      }
    })
  },

  // 阻止触摸移动
  preventTouchMove() {
    return false
  }
})
