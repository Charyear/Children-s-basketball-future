// pages/teacher/audit/audit.js
Page({
  data: {
    activeTab: 0,
    tabs: ['待审核', '已通过', '已驳回'],
    auditList: [
      {
        id: 1,
        childName: '小明',
        childAge: '3岁',
        childClass: '小一班',
        childGender: '男',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        eventName: '2024秋季幼儿篮球趣味赛',
        parentName: '张先生',
        parentPhone: '138****1234',
        submitTime: '2024-10-15 14:30',
        status: 'pending',
        statusText: '待审核',
        statusColor: '#F59E0B'
      },
      {
        id: 2,
        childName: '朵朵',
        childAge: '4岁',
        childClass: '中二班',
        childGender: '女',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        eventName: '2024秋季幼儿篮球趣味赛',
        parentName: '李女士',
        parentPhone: '139****5678',
        submitTime: '2024-10-15 10:20',
        status: 'pending',
        statusText: '待审核',
        statusColor: '#F59E0B'
      },
      {
        id: 3,
        childName: '王浩',
        childAge: '5岁',
        childClass: '大一班',
        childGender: '男',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        eventName: '2024秋季幼儿篮球趣味赛',
        parentName: '王先生',
        parentPhone: '137****9012',
        submitTime: '2024-10-14 16:45',
        status: 'approved',
        statusText: '已通过',
        statusColor: '#10B981'
      }
    ],
    filteredList: [],
    showRejectModal: false,
    rejectReason: '',
    currentRejectId: null
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
    const { activeTab, auditList, tabs } = this.data
    let filteredList = []
    
    const statusMap = ['pending', 'approved', 'rejected']
    filteredList = auditList.filter(item => item.status === statusMap[activeTab])
    
    this.setData({ filteredList })
  },

  // 通过审核
  onPass(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要通过该报名申请吗？',
      success: res => {
        if (res.confirm) {
          wx.showToast({ title: '审核通过', icon: 'success' })
        }
      }
    })
  },

  // 驳回审核
  onReject(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      showRejectModal: true,
      currentRejectId: id,
      rejectReason: ''
    })
  },

  // 关闭驳回弹窗
  onCloseRejectModal() {
    this.setData({
      showRejectModal: false,
      rejectReason: '',
      currentRejectId: null
    })
  },

  // 输入驳回理由
  onRejectReasonInput(e) {
    this.setData({
      rejectReason: e.detail.value
    })
  },

  // 确认驳回
  onConfirmReject() {
    const { rejectReason, currentRejectId } = this.data

    if (!rejectReason || rejectReason.trim() === '') {
      wx.showToast({
        title: '请输入驳回理由',
        icon: 'none'
      })
      return
    }

    // 实际项目中调用后端API提交驳回理由
    wx.showToast({
      title: '已驳回',
      icon: 'success'
    })

    this.onCloseRejectModal()
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
