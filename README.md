# shou

> 给npm v3的扁平方式瘦身


- npm v3是扁平的，把依赖的模块也放到根目录，所以找起来特别费劲。。。
- 其实更多的，你只关系你的package.json的dependency模块
- 比如依赖babel，你的node_modules就要有100多个模块

## 步骤

- 读取pwd下面的package.json
- 获取依赖的，把非依赖的模块都放到node_modules/cache下面
- 创建.npmrc 或追加

> cache='./node_modules/cache'%

- 


