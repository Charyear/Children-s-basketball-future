const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { pool, testConnection } = require('./db')

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 测试接口：检查服务是否运行
app.get('/', (req, res) => {
  res.json({
    code: 200,
    message: '后端服务运行中',
    time: new Date().toISOString()
  })
})

// 测试接口：检查数据库连接
app.get('/api/test/db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now, DATABASE() AS database_name')
    res.json({
      code: 200,
      message: '数据库连接正常',
      data: rows[0]
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '数据库连接失败',
      error: error.message
    })
  }
})

// 通用查询接口（示例）
app.post('/api/query', async (req, res) => {
  try {
    const { sql, params } = req.body
    // 仅允许 SELECT，防止误操作
    if (!sql || !sql.trim().toLowerCase().startsWith('select')) {
      return res.status(400).json({
        code: 400,
        message: '仅支持 SELECT 查询'
      })
    }
    const [rows] = await pool.query(sql, params || [])
    res.json({
      code: 200,
      data: rows
    })
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '查询失败',
      error: error.message
    })
  }
})

// 启动服务
app.listen(PORT, async () => {
  console.log(`🚀 后端服务已启动: http://localhost:${PORT}`)
  await testConnection()
})
