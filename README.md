## isomorphic-app-scheme
利用react、redux、express技术栈搭建的单页应用项目

express后端同构渲染react-redux代码组件，使用react-router-redux作为应用的前端路由，采用蚂蚁金服的antd作为ui组件，redux-devtools调试模块也整合进来了。本工程可以作为小的web项目方案使用，只需在工程中自己添加业务页面就ok了。

### 环境要求
- node 6.0以上
- history 2.x

### 技术栈
- React
- Redux
- React-router
- React-router-redux
- Antd
- Webpack
- Express
- Redux-DevTools
- Babel

### 安装
1.克隆项目到本地
 
```
git clone https://github.com/jypblue/isomorphic-app-scheme
```

2.安装包

```
cd isomorphic-app-scheme
npm install
```
3.启动工程

```
npm run dev
npm run release
```
4.打包

```
npm run build
```

### 项目目录结构
```
├── gulpfile.js               # gulp任务配置
├── package.json              # 项目配置
├── README.md                 # 项目说明
├── src						   # 项目目录
│	 ├── server                    # 本地server
│	 │   ├── index.js              # 本地server入口
│	 │   ├── server.js             # server渲染文件
│	 ├── common                    # 源码目录
│	 │   ├── css/                  # css文件夹
│	 │   ├── fonts/                # 字体文件
│	 │   ├── img/                  # 图片文件夹
│	 │   ├── js                    # js&jsx文件夹
│	 │   │   ├── api/			   	# 
│	 │   │   ├── action/			# Action Creators文件夹：存放可以触发的action函数
│	 │   │   ├── components/       # React展示组件文件夹
│	 │   │   ├── constants/        # Action 大写字符串描述事件
│	 │   │   ├── containers/       # 容器文件夹：存放容器组件
│	 │   │   ├── reducers/         # reducers文件夹：存放action的处理器reducers
│	 │   │   ├── store/            # store文件夹
│	 │   │   └── utils/            # 前端路由文件夹
│	 ├── client   					# 客户端文件夹
├── test   					        # 测试代码文件夹
├── webpack-build.config.js        # webpack基本配置
├── webpack.config.js              # 正式环境webpack配置入口
└── webpack-dev.config.js          # 开发环境webpack配置入口
```


### 后续工作
1. 添加测试模块例子
2. webpack.dll拆包
3. 完善页面，使用antd搭建一个完整的后台例子（目前还是一个空架子）




















