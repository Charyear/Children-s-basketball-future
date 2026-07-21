# 微信小程序后端服务

## 说明

微信小程序无法直接连接 MySQL 数据库，必须通过后端 API 中转。本项目使用 Node.js + Express + mysql2 提供后端服务。

## 数据库配置

数据库信息已写入 `.env` 文件：

- 主机：`mysql7.sqlpub.com`
- 端口：`3312`
- 数据库：`baskball`
- 用户名：`baskball`
- 密码：`JBTSUPCXNuTafTZp`

## 安装依赖

```bash
cd server
npm install
```

## 启动服务

```bash
npm start
```

开发模式（自动重启）：

```bash
npm run dev
```

## 测试连接

服务启动后访问：

- 服务状态：`http://localhost:3000/`
- 数据库测试：`http://localhost:3000/api/test/db`

## 小程序配置

小程序请求地址已改为 `http://localhost:3000`，开发时请在微信开发者工具中勾选「不校验合法域名」。
