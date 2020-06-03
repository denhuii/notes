# Jenkins

## 常用命令行

```bash
# 启动jenkins
systemctl start jenkins.service
# 设置jenkins开机启动 
systemctl enable jenkins.service
# 关闭jenkins
systemctl stop jenkins.service

# 启动Jenkins
service jenkins start
# 重启Jenkins
service jenkins restart
# 停止Jenkins
service jenkins stop

# 查看jenkins的状态
systemctl status jenkins.service

# 查看jenkins相关文件路径
rpm -ql jenkins
 # /etc/init.d/jenkins
 # /etc/logrotate.d/jenkins
 # /etc/sysconfig/jenkins
 # /usr/lib/jenkins
 # /usr/lib/jenkins/jenkins.war
 # /usr/sbin/rcjenkins
 # /var/cache/jenkins
 # /var/lib/jenkins
 # /var/log/jenkins

# 修改jenkins文件夹权限
chown -R jenkins.jenkins tomcat

# 查看jenkins端口号
cat /etc/sysconfig/jenkins

# 修改jenkins端口号
vi /etc/sysconfig/jenkins

# 配置立即生效
source /etc/sysconfig/jenkins

# 查看日志
cat /var/log/jenkins/jenkins.log

```

##  插件安装设置清华源加速

> https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json

## 配置

Jenkins安装目录：

```
/var/lib/jenkins/
```

Jenkins配置文件地址：

```
/etc/sysconfig/jenkins
```

这就是`Jenkins`的配置文件，可以在这里查看`Jenkins`默认的配置。

```
cat jenkins
```

这里介绍下三个比较重要的配置：

- JENKINS_HOME
- JENKINS_USER
- JENKINS_PORT

`JENKINS_HOME`是Jenkins的主目录，Jenkins工作的目录都放在这里,Jenkins储存文件的地址,Jenkins的插件，生成的文件都在这个目录下。

```csharp
<pre class="md-fences md-end-block" lang="shell" contenteditable="false" cid="n105" mdtype="fences" style="box-sizing: border-box; overflow: visible; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; font-size: 0.9em; white-space: pre; display: block; break-inside: avoid; text-align: left; background: var(--code-block-bg-color); background-color: rgb(248, 248, 248); position: relative !important; border: 1px solid rgb(221, 221, 221); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding: 8px 1em 6px; margin-bottom: 15px; margin-top: 15px; width: inherit; color: rgb(51, 51, 51); font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-indent: 0px; text-transform: none; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;">## Path:    Development/Jenkins
## Description: Jenkins Continuous Integration Server
## Type:    string
## Default:   "/var/lib/jenkins"
## ServiceRestart: jenkins
#
# Directory where Jenkins store its configuration and working
# files (checkouts, build reports, artifacts, ...).
#
JENKINS_HOME="/var/lib/jenkins"</pre>
```

`JENKINS_USER`是Jenkins的用户，拥有$JENKINS_HOME和/var/log/jenkins的权限。

```bash
<pre class="md-fences md-end-block" lang="shell" contenteditable="false" cid="n108" mdtype="fences" style="box-sizing: border-box; overflow: visible; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; font-size: 0.9em; white-space: pre; display: block; break-inside: avoid; text-align: left; background: var(--code-block-bg-color); background-color: rgb(248, 248, 248); position: relative !important; border: 1px solid rgb(221, 221, 221); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding: 8px 1em 6px; margin-bottom: 15px; margin-top: 15px; width: inherit; color: rgb(51, 51, 51); font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-indent: 0px; text-transform: none; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;">## Type:    string
## Default:   "jenkins"
## ServiceRestart: jenkins
#
# Unix user account that runs the Jenkins daemon
# Be careful when you change this, as you need to update
# permissions of $JENKINS_HOME and /var/log/jenkins.
#
JENKINS_USER="jenkins"</pre>
```

`JENKINS_PORT`是Jenkins的端口，默认端口是8080，我们这里修改为8000。

```csharp
<pre class="md-fences md-end-block" lang="shell" contenteditable="false" cid="n111" mdtype="fences" style="box-sizing: border-box; overflow: visible; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; font-size: 0.9em; white-space: pre; display: block; break-inside: avoid; text-align: left; background: var(--code-block-bg-color); background-color: rgb(248, 248, 248); position: relative !important; border: 1px solid rgb(221, 221, 221); border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding: 8px 1em 6px; margin-bottom: 15px; margin-top: 15px; width: inherit; color: rgb(51, 51, 51); font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-indent: 0px; text-transform: none; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;">## Type:    integer(0:65535)
## Default:   8080
## ServiceRestart: jenkins
#
# Port Jenkins is listening on.
# Set to -1 to disable
#
JENKINS_PORT="8000"</pre>
```

## 碰到的问题

1. ### 插件下载失败需要出国

   1. 离线安装
   2. 修改成清华源

2. ### 权限配置繁杂，不小心将root用户拒绝

   1. 重装，重装前需要彻底删除Jenkins相关文件
   2. 修改配置文件解决

3. ### 构建工作时，shell脚本运行npm i或者yarn时，提示找不到命令

   1. 将jenkins用户修改成root用户后，成功
   2. 设置中添加 PATH 路径，没有解决
   3. shell脚本添加相关命令，没有解决

## 安装(CentOS下)

### 最新版本安装

1. 安装java

   ```bash
   sudo yum install java
   
   java -version
   ```

2. 添加jenkins源

   ```bash
   sudo wget -O /etc/yum.repos.d/jenkins.repo http://jenkins-ci.org/redhat/jenkins.repo
   
   sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
   ```

3. 安装jenkins（可能会提示没有密匙，添加`--nogpgcheck`跳过检查）

   ```bash
   yum install jenkins --nogpgcheck
   ```

### 历史版本安装

通过yum直接安装的是最新版本的Jenkins，必须使用JDK1.8,，由于我们使用的是jdk1.7，所以需要安装历史版本的jenkins。以下是安装步骤。

1. 去官网，点击下载

   [官网地址](https://jenkins.io/)
2. 选择对应操作系统

3. 选择版本，由于2.54以上的版本需要JDK1.8，所以我们选择选择低版本，这里选择使用2.46.3的版本

4. 将下载下来的rpm文件上传到服务器

5. 首先先添加Jenkins源

   ```bash
   sudo wget -O /etc/yum.repos.d/jenkins.repo http://jenkins-ci.org/redhat/jenkins.repo
   
   sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
   ```

6. 使用rpm命令安装Jenkins，文件名按实际情况填写

   ```bash
   sudo rpm -ih jenkins-2.46.3-1.1.norch.rpm
   ```