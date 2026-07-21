// pages/teacher/eventEdit/eventEdit.js
Page({
  data: {
    eventId: null,
    isEdit: false,
    images: [],
    formData: {
      title: '',
      location: '',
      date: '',
      time: '',
      description: '',
      maxParticipants: '',
      manager: '',
      managerPhone: ''
    }
  },

  onLoad(options) {
    if (options.id) {
      // 编辑模式
      this.setData({
        eventId: options.id,
        isEdit: true
      })
      this.loadEventData(options.id)
    }
    // 否则是新增模式
  },

  // 加载赛事数据
  loadEventData(id) {
    // 实际项目中从后端API获取数据
    // 模拟数据
    this.setData({
      images: [
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
        'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800'
      ],
      formData: {
        title: '春季篮球友谊赛',
        location: '阳光幼儿园体育馆',
        date: '2024-03-15',
        time: '09:00',
        description: '本次比赛旨在培养幼儿对篮球运动的兴趣，提高身体素质，增强团队合作意识。',
        maxParticipants: '50',
        manager: '李老师',
        managerPhone: '13812345678'
      }
    })
  },

  // 添加图片
  onAddImage() {
    const { images } = this.data
    if (images.length >= 9) {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none'
      })
      return
    }

    wx.chooseImage({
      count: 9 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths
        // 实际项目中需要上传到服务器
        this.setData({
          images: [...images, ...tempFilePaths]
        })
      }
    })
  },

  // 删除图片
  onDeleteImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data

    wx.showModal({
      title: '提示',
      content: '确定删除这张图片吗？',
      success: res => {
        if (res.confirm) {
          images.splice(index, 1)
          this.setData({ images })
        }
      }
    })
  },

  // 输入框变化
  onInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  // 日期选择
  onDateChange(e) {
    this.setData({
      'formData.date': e.detail.value
    })
  },

  // 时间选择
  onTimeChange(e) {
    this.setData({
      'formData.time': e.detail.value
    })
  },

  // 取消
  onCancel() {
    wx.navigateBack()
  },

  // 保存
  onSave() {
    const { formData, images, isEdit } = this.data

    // 验证必填字段
    if (!formData.title || !formData.location || !formData.date || !formData.time || !formData.description || !formData.maxParticipants || !formData.manager || !formData.managerPhone) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    if (images.length === 0) {
      wx.showToast({
        title: '请至少上传一张图片',
        icon: 'none'
      })
      return
    }

    // 实际项目中提交到后端API
    wx.showToast({
      title: isEdit ? '保存成功' : '创建成功',
      icon: 'success',
      duration: 1500,
      success: () => {
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  }
})
