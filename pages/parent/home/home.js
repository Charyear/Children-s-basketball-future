// pages/parent/home/home.js
const app = getApp()

Page({
  data: {
    showGuide: false,
    guideStep: 0,
    guideSteps: [
      {
        title: '欢迎使用童篮未来',
        desc: '这里是家长端首页，让我们一起了解如何使用',
        target: 'welcome',
        position: 'bottom'
      },
      {
        title: '快捷入口',
        desc: '点击"最新赛事"查看最新赛事，点击"快速报名"快速报名名额充足的赛事',
        target: 'quick-menu',
        position: 'bottom'
      },
      {
        title: '热门赛事',
        desc: '浏览所有热门赛事，点击赛事卡片查看详情并报名',
        target: 'event-list',
        position: 'top'
      },
      {
        title: '底部导航',
        desc: '通过底部导航可以切换到"赛事"、"报名"、"回顾"和"我的"页面',
        target: 'tabbar',
        position: 'top'
      }
    ],
    quickMenu: [
      { icon: '📅', name: '最新赛事', color: '#FF7A2F', bgColor: '#FFF7ED' },
      { icon: '✏️', name: '快速报名', color: '#3B82F6', bgColor: '#EFF6FF' },
      { icon: '🏆', name: '赛事荣誉', color: '#F59E0B', bgColor: '#FFFBEB' },
      { icon: '🎬', name: '精彩回放', color: '#3B82F6', bgColor: '#EFF6FF' }
    ],
    hotEvents: [
      {
        id: 1,
        title: '幼儿篮球友谊赛',
        location: '市体育中心篮球馆',
        date: '2024-03-15',
        spots: 30,
        enrolled: 18,
        remaining: 12,
        status: '报名中',
        btnColor: '#FF7A2F',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
        images: [
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
          'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800'
        ],
        description: '2024春季幼儿篮球赛专为3-6岁幼儿设计，包含趣味运球、投篮挑战、团队协作等多个适合幼儿的篮球游戏项目。',
        manager: '李老师',
        managerPhone: '13812345678'
      },
      {
        id: 2,
        title: '幼儿趣味运球赛',
        location: '阳光幼儿园室内篮球场',
        date: '2024-03-20',
        spots: 24,
        enrolled: 24,
        remaining: 0,
        status: '名额已满',
        btnColor: '#999999',
        image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800',
        images: [
          'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800'
        ],
        description: '专注于基础运球技巧训练的趣味比赛，让孩子在游戏中掌握篮球基本功。',
        manager: '王教练',
        managerPhone: '13987654321'
      },
      {
        id: 3,
        title: '亲子篮球互动赛',
        location: '童篮未来训练基地',
        date: '2024-03-25',
        spots: 40,
        enrolled: 28,
        remaining: 12,
        status: '报名中',
        btnColor: '#3B82F6',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        images: [
          'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
          'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800'
        ],
        description: '家长与孩子共同参与的篮球活动，增进亲子关系的同时培养运动兴趣。',
        manager: '张老师',
        managerPhone: '13698745632'
      }
    ],
    showEnrollModal: false,
    showEventDetail: false,
    selectedEvent: null,
    selectedChildId: null,
    detailTranslateY: 0,
    detailStartY: 0,
    children: [
      {
        id: 1,
        name: '张小明',
        age: '5岁',
        class: '小一班',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'
      },
      {
        id: 2,
        name: '张小红',
        age: '4岁',
        class: '中一班',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'
      }
    ]
  },

  onShow() {
    // 检查是否第一次访问
    const hasSeenGuide = wx.getStorageSync('parent_home_guide_seen')
    if (!hasSeenGuide) {
      this.setData({
        showGuide: true,
        guideStep: 0
      })
    }

    // 初始化自定义 tabBar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init()
    }
  },

  // 下一步引导
  onNextGuideStep() {
    const nextStep = this.data.guideStep + 1
    if (nextStep >= this.data.guideSteps.length) {
      this.onCloseGuide()
    } else {
      this.setData({
        guideStep: nextStep
      })
    }
  },

  // 跳过引导
  onSkipGuide() {
    this.onCloseGuide()
  },

  // 关闭引导
  onCloseGuide() {
    this.setData({
      showGuide: false,
      guideStep: 0
    })
    wx.setStorageSync('parent_home_guide_seen', true)
  },

  // 搜索
  onSearch() {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' })
  },

  // 通知
  onNotice() {
    wx.showToast({ title: '暂无新通知', icon: 'none' })
  },

  // 快捷菜单点击
  onQuickMenuTap(e) {
    const index = e.currentTarget.dataset.index

    if (index === 0) {
      // 最新赛事：找到更新时间最近的赛事（这里用日期最近的）
      const latestEvent = this._findLatestEvent()
      if (latestEvent) {
        this.onShowEventDetail({ currentTarget: { dataset: { event: latestEvent } } })
      } else {
        wx.showToast({ title: '暂无赛事', icon: 'none' })
      }
    } else if (index === 1) {
      // 快速报名：找到剩余名额最多的赛事
      const mostAvailableEvent = this._findMostAvailableEvent()
      if (mostAvailableEvent) {
        this.onShowEventDetail({ currentTarget: { dataset: { event: mostAvailableEvent } } })
      } else {
        wx.showToast({ title: '暂无赛事', icon: 'none' })
      }
    } else {
      const menus = ['最新赛事', '快速报名', '赛事荣誉', '精彩回放']
      wx.showToast({ title: menus[index], icon: 'none' })
    }
  },

  // 找到日期最近的赛事
  _findLatestEvent() {
    const events = this.data.hotEvents
    if (events.length === 0) return null

    // 解析日期字符串，支持多种格式
    const parseDate = (dateStr) => {
      // 格式如 "2024-03-15"
      if (dateStr.includes('-')) {
        return new Date(dateStr).getTime()
      }
      // 格式如 "2024年4月27日"
      const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
      if (match) {
        return new Date(match[1], parseInt(match[2]) - 1, match[3]).getTime()
      }
      return 0
    }

    // 找到日期最近的赛事（距离当前时间最近的未来赛事）
    const now = Date.now()
    let latestEvent = events[0]
    let latestTime = parseDate(events[0].date)

    events.forEach(event => {
      const eventTime = parseDate(event.date)
      // 找到最接近当前时间且在未来的赛事
      if (eventTime >= now && (latestTime < now || eventTime < latestTime)) {
        latestTime = eventTime
        latestEvent = event
      }
    })

    return latestEvent
  },

  // 找到剩余名额最多的赛事
  _findMostAvailableEvent() {
    const events = this.data.hotEvents
    if (events.length === 0) return null

    let mostAvailableEvent = events[0]
    events.forEach(event => {
      if (event.remaining > mostAvailableEvent.remaining) {
        mostAvailableEvent = event
      }
    })

    return mostAvailableEvent
  },

  // 查看全部 - 上滑页面隐藏上面内容
  onViewAll() {
    const query = wx.createSelectorQuery()
    query.select('.event-list-full').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      if (res[0] && res[1]) {
        wx.pageScrollTo({
          scrollTop: res[0].top + res[1].scrollTop - 88,
          duration: 300
        })
      }
    })
  },

  // 立即报名
  onQuickEnroll(e) {
    const event = e.currentTarget.dataset.event
    this.setData({
      showEnrollModal: true,
      selectedEvent: event,
      selectedChildId: null
    })
  },

  // 显示赛事详情
  onShowEventDetail(e) {
    const event = e.currentTarget.dataset.event
    this.setData({
      showEventDetail: true,
      selectedEvent: event,
      detailTranslateY: 0
    })
  },

  // 关闭赛事详情
  onCloseEventDetail() {
    this.setData({
      showEventDetail: false,
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
      this.onCloseEventDetail()
    } else {
      this.setData({
        detailTranslateY: 0
      })
    }
  },

  // 从详情页报名
  onEnrollFromDetail(e) {
    this.setData({
      showEventDetail: false,
      showEnrollModal: true,
      selectedChildId: null,
      detailTranslateY: 0
    })
  },

  // 选择孩子
  onSelectChild(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ selectedChildId: id })
  },

  // 确认孩子选择，跳转到报名表单
  onConfirmChildSelect() {
    if (this.data.selectedChildId === null) {
      wx.showToast({ title: '请选择参赛孩子', icon: 'none' })
      return
    }
    const selectedChild = this.data.children.find(item => item.id === this.data.selectedChildId)
    const event = this.data.selectedEvent
    this.setData({ showEnrollModal: false })
    wx.navigateTo({
      url: `/pages/parent/enrollForm/enrollForm?eventId=${event.id}&eventTitle=${encodeURIComponent(event.title)}&eventDate=${encodeURIComponent(event.date)}&eventLocation=${encodeURIComponent(event.location)}&childId=${selectedChild.id}&childName=${encodeURIComponent(selectedChild.name)}&childAge=${encodeURIComponent(selectedChild.age)}&childClass=${encodeURIComponent(selectedChild.class)}&childAvatar=${encodeURIComponent(selectedChild.avatar)}`
    })
  },

  // 取消报名弹窗
  onCancelEnroll() {
    this.setData({ showEnrollModal: false, selectedChildId: null })
  },

  // 阻止触摸移动
  preventTouchMove() {
    return false
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '童篮未来 - 幼儿篮球赛事服务平台',
      path: '/pages/parent/home/home'
    }
  }
})
