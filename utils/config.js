// utils/config.js
module.exports = {
  // API基础地址
  baseUrl: 'http://localhost:3000',

  // 用户角色
  ROLE: {
    PARENT: 'parent',
    TEACHER: 'teacher',
    ADMIN: 'admin'
  },
  
  // 报名状态
  ENROLL_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled'
  },
  
  // 赛事状态
  EVENT_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ONGOING: 'ongoing',
    ENDED: 'ended'
  },
  
  // 颜色配置
  COLORS: {
    primary: '#FF7A2F',
    secondary: '#3B82F6',
    warm: '#FFF7ED',
    cool: '#EFF6FF',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444'
  }
}
