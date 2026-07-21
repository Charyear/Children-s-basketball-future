// pages/teacher/eventDetail/eventDetail.js
Page({
  data: {
    eventId: null,
    eventDetail: {
      id: 1,
      title: '春季篮球友谊赛',
      location: '阳光幼儿园体育馆',
      time: '2024年3月15日 09:00',
      description: '本次比赛旨在培养幼儿对篮球运动的兴趣，提高身体素质，增强团队合作意识。比赛分为小班组、中班组和大班组三个组别进行，采用3V3形式，每场比赛10分钟。',
      enrolled: 28,
      maxParticipants: 50,
      manager: '李老师',
      managerPhone: '13812345678',
      status: '进行中',
      images: [
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
        'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800'
      ]
    },
    studentList: [
      {
        id: 1,
        name: '李明宇',
        avatar: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=200',
        grade: '大班',
        kindergarten: '阳光幼儿园'
      },
      {
        id: 2,
        name: '王小雨',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        grade: '中班',
        kindergarten: '阳光幼儿园'
      }
    ]
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ eventId: options.id })
      this.loadEventDetail(options.id)
    }
  },

  // 加载赛事详情
  loadEventDetail(id) {
    // 实际项目中从后端API获取数据
    // 这里使用模拟数据
  },

  // 编辑赛事
  onEditEvent() {
    wx.navigateTo({
      url: `/pages/teacher/eventEdit/eventEdit?id=${this.data.eventId}`
    })
  }
})
