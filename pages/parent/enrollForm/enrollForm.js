// pages/parent/enrollForm/enrollForm.js
Page({
  data: {
    // 赛事信息
    eventId: '',
    eventTitle: '',
    eventDate: '',
    eventLocation: '',
    // 孩子信息（只读）
    childId: '',
    childName: '',
    childAge: '',
    childClass: '',
    childAvatar: '',
    // 表单字段
    jerseyNumber: '',
    guardianName: '',
    guardianPhone: '',
    remark: ''
  },

  onLoad(options) {
    // 解析传递过来的参数
    this.setData({
      eventId: options.eventId || '',
      eventTitle: decodeURIComponent(options.eventTitle || ''),
      eventDate: decodeURIComponent(options.eventDate || ''),
      eventLocation: decodeURIComponent(options.eventLocation || ''),
      childId: options.childId || '',
      childName: decodeURIComponent(options.childName || ''),
      childAge: decodeURIComponent(options.childAge || ''),
      childClass: decodeURIComponent(options.childClass || ''),
      childAvatar: decodeURIComponent(options.childAvatar || '')
    })
  },

  // 球衣号码输入
  onJerseyNumberInput(e) {
    this.setData({ jerseyNumber: e.detail.value })
  },

  // 联系人姓名输入
  onGuardianNameInput(e) {
    this.setData({ guardianName: e.detail.value })
  },

  // 联系电话输入
  onGuardianPhoneInput(e) {
    this.setData({ guardianPhone: e.detail.value })
  },

  // 备注输入
  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  // 表单验证
  validateForm() {
    const { jerseyNumber, guardianName, guardianPhone } = this.data

    if (!jerseyNumber) {
      wx.showToast({ title: '请输入球衣号码', icon: 'none' })
      return false
    }
    const num = parseInt(jerseyNumber)
    if (isNaN(num) || num < 1 || num > 99) {
      wx.showToast({ title: '球衣号码应为1-99', icon: 'none' })
      return false
    }

    if (!guardianName.trim()) {
      wx.showToast({ title: '请输入联系人姓名', icon: 'none' })
      return false
    }

    if (!guardianPhone) {
      wx.showToast({ title: '请输入联系电话', icon: 'none' })
      return false
    }
    if (!/^1[3-9]\d{9}$/.test(guardianPhone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return false
    }

    return true
  },

  // 提交报名
  onSubmit() {
    if (!this.validateForm()) return

    wx.showLoading({ title: '提交中...' })

    // 模拟提交请求
    setTimeout(() => {
      wx.hideLoading()
      wx.showModal({
        title: '报名成功',
        content: '您的报名已提交，请等待审核',
        showCancel: false,
        success: () => {
          // 返回上一页
          wx.navigateBack()
        }
      })
    }, 1500)
  }
})
