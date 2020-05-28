# Jenkins

## 常用命令行

```bash
# 启动jenkins
systemctl start jenkins.service
# 设置jenkins开机启动 
systemctl enable jenkins.service
# 关闭jenkins
systemctl stop jenkins.service

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

# 启动Jenkins
service jenkins start
# 重启Jenkins
service jenkins restart
# 停止Jenkins
service jenkins stop

# 查看日志
cat /var/log/jenkins/jenkins.log

```

##  插件安装清华源

> https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json