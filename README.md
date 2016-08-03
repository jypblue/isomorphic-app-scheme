## isomorphic-app-scheme
利用react、redux、express技术栈搭建的单页应用项目

express后端同构渲染react-redux代码组件，使用react-router-redux作为应用的前端路由，采用蚂蚁金服的antd作为ui组件，redux-devtools调试模块也整合进来了。本工程可以作为小的web项目方案使用，只需在工程中自己添加业务页面就ok了。

### 环境要求
- node 4.0以上
- history 2.0

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

### 项目结构


后续还会添加gulp任务控制，测试模块，eslint语法控制