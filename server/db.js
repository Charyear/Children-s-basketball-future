const mysql = require('mysql2/promise')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3312,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 兼容 MySQL 8.0 的认证插件
  authPlugins: {
    mysql_native_password: () => () => Buffer.from(process.env.DB_PASSWORD + '\0')
  }
})

// 测试连接
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log('✅ 数据库连接成功')
    connection.release()
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message)
  }
}

module.exports = {
  pool,
  testConnection
}
