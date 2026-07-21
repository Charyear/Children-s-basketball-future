// pages/teacher/student/student.js
Page({
  data: {
    activeTab: 0,
    tabs: ['全部学员', '小班', '中班', '大班'],
    searchKeyword: '',
    currentTeacher: {
      id: 1,
      name: '李老师'
    },
    studentList: [
      {
        id: 1,
        name: '李明宇',
        studentId: '202401001',
        class: '大班',
        classColor: '#3B82F6',
        events: 3,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        gender: '男',
        age: '5岁',
        phone: '13812341234',
        grade: '大班',
        kindergarten: '阳光幼儿园',
        parentName: '李先生',
        relationship: '父亲',
        parentPhone: '13812341234',
        teacherId: 1,
        teacherName: '李老师'
      },
      {
        id: 2,
        name: '张朵朵',
        studentId: '202402003',
        class: '中班',
        classColor: '#3B82F6',
        events: 2,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        gender: '女',
        age: '4岁',
        phone: '13956785678',
        grade: '中班',
        kindergarten: '阳光幼儿园',
        parentName: '张女士',
        relationship: '母亲',
        parentPhone: '13956785678',
        teacherId: 1,
        teacherName: '李老师'
      },
      {
        id: 3,
        name: '王浩然',
        studentId: '202403007',
        class: '小班',
        classColor: '#3B82F6',
        events: 1,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        gender: '男',
        age: '3岁',
        phone: '13790129012',
        grade: '小班',
        kindergarten: '阳光幼儿园',
        parentName: '王先生',
        relationship: '父亲',
        parentPhone: '13790129012',
        teacherId: 1,
        teacherName: '李老师'
      }
    ],
    filteredList: [],
    showStudentDetail: false,
    selectedStudent: {},
    showAddStudentModal: false,
    newStudent: {
      name: '',
      gender: '男',
      age: '',
      phone: '',
      grade: '小班',
      kindergarten: '阳光幼儿园',
      parentName: '',
      relationship: '父亲',
      parentPhone: ''
    }
  },

  onLoad() {
    // 加载当前教师信息（实际应从登录信息或全局状态获取）
    const app = getApp()
    // 这里可以从 app.globalData 或 wx.getStorageSync 获取当前教师信息
    // this.setData({
    //   currentTeacher: {
    //     id: app.globalData.teacherId,
    //     name: app.globalData.teacherName
    //   }
    // })

    // 筛选只显示当前教师的学生
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

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    this._filterList()
  },

  // 筛选列表
  _filterList() {
    const { activeTab, studentList, tabs, searchKeyword, currentTeacher } = this.data
    let filteredList = []

    // 首先过滤只显示当前教师的学生
    let teacherStudents = studentList.filter(item => item.teacherId === currentTeacher.id)

    if (activeTab === 0) {
      filteredList = teacherStudents
    } else {
      filteredList = teacherStudents.filter(item => item.class === tabs[activeTab])
    }

    if (searchKeyword) {
      filteredList = filteredList.filter(item =>
        item.name.includes(searchKeyword) || item.studentId.includes(searchKeyword)
      )
    }

    this.setData({ filteredList })
  },

  // 添加学员
  onAddStudent() {
    // 新添加的学员自动绑定当前教师
    const { currentTeacher } = this.data
    this.setData({
      showAddStudentModal: true
    })
  },

  // 关闭添加学员弹窗
  onCloseAddStudentModal() {
    this.setData({
      showAddStudentModal: false,
      newStudent: {
        name: '',
        gender: '男',
        age: '',
        phone: '',
        grade: '小班',
        kindergarten: '阳光幼儿园',
        parentName: '',
        relationship: '父亲',
        parentPhone: ''
      }
    })
  },

  // 表单输入
  onStudentInputChange(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`newStudent.${field}`]: e.detail.value
    })
  },

  // 选择性别
  onGenderChange(e) {
    this.setData({
      'newStudent.gender': e.detail.value
    })
  },

  // 选择年级
  onGradeChange(e) {
    this.setData({
      'newStudent.grade': e.detail.value
    })
  },

  // 选择关系
  onRelationshipChange(e) {
    this.setData({
      'newStudent.relationship': e.detail.value
    })
  },

  // 提交添加学员
  onSubmitAddStudent() {
    const { newStudent, currentTeacher, studentList } = this.data

    // 验证必填字段
    if (!newStudent.name || !newStudent.age || !newStudent.phone || !newStudent.parentName || !newStudent.parentPhone) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    // 生成新学员ID和学号
    const newId = studentList.length + 1
    const newStudentId = `2024${String(newId).padStart(5, '0')}`

    // 添加到学员列表
    const student = {
      id: newId,
      studentId: newStudentId,
      name: newStudent.name,
      gender: newStudent.gender,
      age: newStudent.age,
      phone: newStudent.phone,
      grade: newStudent.grade,
      class: newStudent.grade,
      classColor: '#3B82F6',
      kindergarten: newStudent.kindergarten,
      parentName: newStudent.parentName,
      relationship: newStudent.relationship,
      parentPhone: newStudent.parentPhone,
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      events: 0
    }

    this.setData({
      studentList: [...studentList, student]
    }, () => {
      this._filterList()
      this.onCloseAddStudentModal()
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
    })
  },

  // 查看记录
  onViewRecord(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '查看参赛记录: ' + id, icon: 'none' })
  },

  // 查看学员详情
  onViewStudent(e) {
    const id = e.currentTarget.dataset.id
    const student = this.data.studentList.find(item => item.id === id)
    if (student) {
      this.setData({
        selectedStudent: student,
        showStudentDetail: true
      })
    }
  },

  // 关闭学员详情
  onCloseStudentDetail() {
    this.setData({
      showStudentDetail: false
    })
  },

  // 编辑学员
  onEditStudent(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '编辑学员: ' + id, icon: 'none' })
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
