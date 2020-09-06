# Node环境

## NVM

> 管理node版本

### CentOS安装

1. 安装

   ```bssh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
   ```

   or

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
   ```

   

2. 设置环境变量

   ```bash
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
   ```

### 常用命令

```bash
# 下载node版本
nvm install <版本号>

# 切换node版本
nvm use <版本号>

# 罗列本地下载的版本
nvm ls

# 罗列远程版本
nvm ls-remote

# 设置本地默认的版本
nvm alias default <版本号>
```

## NRM

> 切换npm包镜像源地址

### 安装

```bash
npm install -g nrm
```

### 常用命令

```bash
#查看当前使用的源
nrm cureen

# 列出可选择的源
nrm ls

# 切换源
nrm use <registry>

# 添加源
nrm add <registry> <url>

# 删除源
nrm del <registry>

# 测试源速度
nrm test npm
```

## NCU

> 升级npm包版本

### 安装

```bash
npm install -g npm-check-update
```

### 常用命令

```bash
# 检查更新
ncu

# 升级packjson.json
ncu -u

# 安装
yarn
# or
npm i
```

## Yarn

### 安装

```bash
npm install -g yarn
```

### 常用命令

```bash
# dependencies生产环境下的包 安装一个或多个
yarn add [package]@[version]

# devDependencies 开发环境下 安装一个或多个
yarn add [package]@[version] -D 
# or 
yarn add [package]@[version] --dev

#移除包
yarn remove [package]
```

