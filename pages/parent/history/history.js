// pages/parent/history/history.js
Page({
  data: {
    activeTab: 0,
    tabs: ['全部', '2024春季赛', '2023冬季赛', '趣味嘉年华', '亲子运动会'],
    historyList: [
      {
        id: 1,
        title: '2024童篮未来春季邀请赛',
        date: '2024年4月15日',
        category: '2024春季赛',
        categoryColor: '#FF7A2F',
        description: '本次春季邀请赛共有12所幼儿园参与，小运动员们展现了出色的篮球技巧和团队协作精神，现场气氛热烈，充满欢声笑语。',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200' },
          { type: 'video', url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=200' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200' }
        ]
      },
      {
        id: 2,
        title: '2023童篮未来冬季趣味赛',
        date: '2023年12月23日',
        category: '2023冬季赛',
        categoryColor: '#3B82F6',
        description: '冬季趣味赛设置了运球接力、投篮小能手等多个趣味项目，孩子们在游戏中感受到篮球运动的快乐，留下了许多美好的回忆。',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=200' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200' },
          { type: 'video', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200' }
        ]
      }
    ],
    filteredList: []
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
    const { activeTab, historyList, tabs } = this.data
    let filteredList = []
    
    if (activeTab === 0) {
      filteredList = historyList
    } else {
      filteredList = historyList.filter(item => item.category === tabs[activeTab])
    }
    
    this.setData({ filteredList })
  },

  // 预览图片
  onPreviewImage(e) {
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url]
    })
  },

  // 播放视频
  onPlayVideo(e) {
    wx.showToast({ title: '视频播放功能开发中', icon: 'none' })
  },

  // 阻止触摸移动
  preventTouchMove() {
    return false
  }
})
