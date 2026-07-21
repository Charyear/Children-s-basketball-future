** Children 's basketball future ** is a children 's basketball tournament management platform based on WeChat applet. It connects kindergarten teachers and parents, and provides one-stop services such as event release, online registration, audit management, and event review.

## 技术架构

### 前端技术栈
- **平台**: 微信小程序
- **语言**: JavaScript/WXML/WXSS
- **框架**: 原生小程序开发
- **组件库**: 自定义组件 + WeUI

### 后端技术栈
- **API服务**: RESTful API
- **服务器**: Node.js / Python / Java (待定)
- **数据库**: MySQL / PostgreSQL (待定)
- **认证方式**: JWT Token

## 核心功能

### 教师端功能
- 赛事创建与管理 (草稿、发布、进行中、已结束)
- 学生信息管理
- 报名审核系统
- 赛事数据统计
- 通知推送管理

### 家长端功能
- 赛事浏览与搜索
- 快速报名系统
- 多子女管理
- 报名历史回顾
- 赛事信息查看

### 系统功能
- 角色权限管理 (家长/教师)
- 用户认证与登录
- 数据安全与隐私保护
- 消息通知系统

## 项目结构

```
bask/
├── app.js                    # 小程序全局配置
├── app.json                  # 小程序页面配置
├── app.wxss                  # 全局样式
├── utils/
│   ├── config.js             # 配置常量
│   └── util.js               # 工具函数
├── pages/
│   ├── login/                # 登录页面
│   ├── parent/               # 家长端
│   │   ├── home/             # 家长首页
│   │   ├── enroll/           # 报名页面
│   │   ├── enrollForm/       # 报名表单
│   │   ├── history/          # 历史回顾
│   │   └── profile/          # 个人中心
│   └── teacher/              # 教师端
│       ├── event/            # 赛事管理
│       ├── audit/            # 审核管理
│       ├── student/          # 学生管理
│       ├── profile/          # 教师中心
│       ├── eventDetail/      # 赛事详情
│       └── eventEdit/        # 赛事编辑
└── static/                   # 静态资源
```

## 当前API配置

- **基础URL**: `https://api.tonglanweilai.com`
- **认证方式**: Bearer Token
- **请求头**: `Authorization: Bearer <token>`

## 快速开始

### 1. 环境准备

1. 安装微信开发者工具
2. 配置小程序AppID
3. 设置开发环境变量

### 2. 运行项目

1. 导入项目到微信开发者工具
2. 配置合法域名 (需与API服务器一致)
3. 启动项目进行调试

### 3. 测试账号

- **教师账号**: 测试中
- **家长账号**: 测试中
- **初始密码**: 请联系管理员获取

## 后端开发规划

### 第一阶段：核心功能开发 (预计4-6周)

#### 1. 用户系统
- 用户注册与登录
- JWT认证机制
- 角色权限管理
- 用户信息管理

#### 2. 赛事系统
- 赛事创建、编辑、删除
- 赛事状态管理 (草稿/发布/进行中/已结束)
- 赛事分类与标签
- 赛事数据统计

#### 3. 报名系统
- 在线报名功能
- 报名审核流程
- 报名状态管理
- 报名数据统计

### 第二阶段：高级功能开发 (预计3-4周)

#### 1. 通知系统
- 消息推送功能
- 站内通知
- 微信模板消息
- 短信通知

#### 2. 数据统计
- 数据可视化报表
- 用户行为分析
- 赛事效果评估
- 运营数据分析

#### 3. 权限管理
- 细粒度权限控制
- 操作日志记录
- 数据权限隔离
- 管理员后台

### 第三阶段：系统优化 (预计2-3周)

#### 1. 性能优化
- 接口性能优化
- 缓存策略实施
- CDN加速配置
- 数据库查询优化

#### 2. 安全加固
- 数据加密传输
- SQL注入防护
- XSS攻击防护
- 权限越权防护

## 数据库配置方案

### 数据库选型建议

#### 方案一：MySQL (推荐)
- **适用场景**: 中小型项目，快速开发
- **优势**: 社区成熟，文档丰富，易于维护
- **适用规模**: 用户量10万以内

#### 方案二：PostgreSQL
- **适用场景**: 复杂查询，数据完整性要求高
- **优势**: 功能强大，支持事务，扩展性好
- **适用规模**: 中大型项目

### 数据库连接配置

```javascript
// 数据库配置示例
const dbConfig = {
  // 基础连接参数
  host: 'localhost',          // 数据库服务器地址
  port: 3306,                 // MySQL默认端口，PostgreSQL为5432
  user: 'your_username',      // 数据库用户名
  password: 'your_password',  // 数据库密码
  database: 'tonglanweilai',  // 数据库名称
  
  // 连接池配置
  pool: {
    max: 20,                  // 最大连接数
    min: 5,                   // 最小连接数
    acquire: 30000,           // 获取连接超时时间(ms)
    idle: 10000               // 连接空闲时间(ms)
  },
  
  // 连接配置
  connectionLimit: 10,         // 连接限制
  acquireTimeout: 60000,       // 获取超时
  timeout: 60000,             // 连接超时
  
  // 字符集配置
  charset: 'utf8mb4_general_ci',
  timezone: '+8:00'
};
```

### 数据库表结构设计

#### 核心表结构

```sql
-- 用户表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE,
  role ENUM('parent', 'teacher', 'admin') NOT NULL,
  real_name VARCHAR(50),
  avatar VARCHAR(255),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 学生信息表
CREATE TABLE students (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  name VARCHAR(50) NOT NULL,
  age INT,
  gender ENUM('male', 'female'),
  class VARCHAR(50),
  avatar VARCHAR(255),
  parent_info JSON,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 赛事表
CREATE TABLE events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  max_participants INT,
  manager_id BIGINT NOT NULL,
  status ENUM('draft', 'published', 'ongoing', 'ended') DEFAULT 'draft',
  cover_image VARCHAR(255),
  images JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES users(id)
);

-- 报名表
CREATE TABLE enrollments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
  enrollment_info JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 操作日志表
CREATE TABLE operation_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id BIGINT,
  ip_address VARCHAR(50),
  user_agent TEXT,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 数据库部署建议

#### 1. 开发环境配置
```bash
# MySQL安装 (Windows)
# 使用MySQL Installer进行安装
# 配置root密码和用户权限

# 或使用Docker快速部署
docker run -d -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=tonglanweilai \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0
```

#### 2. 生产环境配置
- **服务器配置**: 4核8G以上
- **存储空间**: 100GB以上
- **备份策略**: 每日全量备份 + 每小时增量备份
- **主从复制**: 读写分离配置
- **读写分离**: 主库写，从库读

## API接口设计

### 认证接口

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response:
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "string",
    "user": {
      "id": 1,
      "username": "string",
      "role": "parent|teacher|admin"
    }
  }
}
```

### 赛事接口

```
GET /api/events?status=draft&page=1&limit=10
Authorization: Bearer <token>

Response:
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [...],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}

POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "location": "string",
  "start_date": "2024-01-01 09:00:00",
  "end_date": "2024-01-01 17:00:00",
  "max_participants": 50
}
```

### 报名接口

```
POST /api/enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "event_id": 1,
  "student_id": 1,
  "enrollment_info": {
    "health_info": "string",
    "emergency_contact": "string"
  }
}

PUT /api/enrollments/{id}/approve
Authorization: Bearer <token>

Response:
{
  "code": 0,
  "message": "报名审核通过"
}
```

## 开发规范

### 代码规范
- 遵循ESLint规则
- 统一代码风格
- 模块化开发
- 注释完整

### API规范
- RESTful API设计
- 统一错误码
- 请求响应格式统一
- 版本控制

### 数据库规范
- 命名规范统一
- 索引优化
- 事务处理
- 数据备份

## 测试计划

### 单元测试
- 用户认证测试
- 赛事管理测试
- 报名流程测试
- 权限控制测试

### 集成测试
- API接口测试
- 数据库集成测试
- 第三方服务集成测试

### 性能测试
- 并发用户测试
- 响应时间测试
- 数据库性能测试
- 压力测试

## 部署方案

### 开发环境
- 本地开发环境
- Docker容器化
- 自动化构建

### 测试环境
- 预发布环境
- 自动化测试
- 性能测试

### 生产环境
- 负载均衡
- 高可用配置
- 监控告警
- 自动化部署

## 运维监控

### 系统监控
- 服务器性能监控
- 数据库性能监控
- API响应时间监控
- 错误日志监控

### 业务监控
- 用户活跃度监控
- 赛事参与度监控
- 报名转化率监控
- 系统健康度监控

## 联系方式

- **项目负责人**: [您的姓名]
- **技术团队**: [联系方式]
- **客服热线**: [电话号码]
- **邮箱**: [邮箱地址]

---

**童篮未来，让每个孩子都能享受篮球的快乐！**
```
- **后端框架选择**:
  - Node.js + Express/Koa (快速开发，适合小程序后端)
  - Python + Django/Flask (功能全面，适合复杂业务)
  - Java + Spring Boot (企业级，适合大型项目)
- **项目结构设计**:
  ```
  backend/
  ├── src/
  │   ├── controllers/     # 控制器
  │   ├── models/         # 数据模型
  │   ├── routes/         # 路由
  │   ├── middleware/      # 中间件
  │   ├── services/       # 业务逻辑
  │   ├── utils/          # 工具函数
  │   └── config/         # 配置文件
  ├── package.json
  └── server.js
