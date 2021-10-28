## Linux

### 常用命令

```bash
# 查看 ssh 服务状态
service sshd status

# 查看默认监听端口
netstat -anlp | grep sshd

# 查看ssh配置文件
vi /etc/ssh/sshd_config
```

### 修改ssh端口

1. 用vi编辑器打开 ssh 配置文件

   ```bash
   vi /etc/ssh/sshd_config	
   ```

2. 修改port

   ```bash
   # If you want to change the port on a SELinux system, you have to tell
   # SELinux about this change.
   # semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
   #
   Port 10022
   #AddressFamily any
   #ListenAddress 0.0.0.0
   #ListenAddress ::
   ```

3. 按照提示输入命令以添加端口

   ```bash
   semanage port -a -t ssh_port_t -p tcp 100224
   ```

4. 查看ssh端口

   ```bash
   semanage port -l | grep ssh
   ```

5. 删除多余的端口

   ```bash
   semanage port -d -t ssh_port_t -p tcp [端口号]
   ```

6. 重启一下ssh

   ```bash
   service sshd restart
   ```

### 通过密匙方式连接ssh

1. 本地pc执行，会在`~/.ssh/`下生成一个`id_rsa.pub`和`id_rsa`

   ````bash
   ssh-keygen
   ````

2. 查看`id_rsa.pub`中的内容

   ```bash
   cat id_rsa.pub
   ```

3. 复制 `ide-rsa.pub`中的内容到服务器`~/.ssh/authorized_keys`中

   ```bash
   vi authorized_keys
   ```

4. `vi`编辑本地`.ssh`目录中的config

   ```bash
   vi ~/.ssh/config
   ```

   ```vim
   Host [自定义个名字]
   Port [端口]
   HostName [ip地址]
   User root
   IdentityFile ~/.ssh/id_rsa
   IdentitiesOnly yes
   ```

## firewall防火墙

### 1、查看firewall服务状态


```bash
systemctl status firewalld
```

出现`Active: active (running)`切高亮显示则表示是启动状态。

出现 `Active: inactive (dead)`灰色表示停止，看单词也行。

### 2、查看firewall的状态

```bash
firewall-cmd --state
```

### 3、开启、重启、关闭、firewalld.service服务

\# 开启

```bash
service firewalld start
```

\# 重启

```bash
service firewalld restart
```

\# 关闭

```bash
service firewalld stop
```

### 4、查看防火墙规则

```bash
firewall-cmd --list-all
```

### 5、查询、开放、关闭端口

#### \# 查询端口是否开放

```bash
firewall-cmd --query-port=8080/tcp
```

#### \# 开放80端口

```bash
firewall-cmd --permanent --add-port=80/tcp
```

#### \# 移除端口

```bash
firewall-cmd --permanent --remove-port=8080/tcp
```

#### \#重启防火墙(修改配置后要重启防火墙)

```bash
firewall-cmd --reload
```

\# 参数解释
1、`firwall-cmd`：是Linux提供的操作firewall的一个工具；
2、`--permanent`：表示设置为持久；
3、`--add-port`：标识添加的端口；



## yum安装Nginx

### 前言

Nginx (engine x) 是一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 服务器。。 本例演示 CentOS 7 下安装和配置 Nginx 的基本步骤。

### 环境说明

CentOS 7（Minimal Install）

```bash
cat /etc/redhat-release 
CentOS Linux release 7.7.1908 (Core)
```

### 步骤

1. #### 添加 yum 源

   Nginx 不在默认的 yum 源中，可以使用 epel 或者官网的 yum 源，本例使用官网的 yum 源。

   ```bash
   sudo rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
   ```

   安装完 yum 源之后，可以查看一下

   ```bash
   sudo yum repolist
   Loaded plugins: fastestmirror, langpacks
   Loading mirror speeds from cached hostfile
    * base: mirrors.aliyun.com
    * extras: mirrors.aliyun.com
    * updates: mirrors.aliyun.com
   repo id                          repo name                          status
   base/7/x86_64                    CentOS-7 - Base                    9,911
   extras/7/x86_64                  CentOS-7 - Extras                    368
   nginx/x86_64                     nginx repo                           108
   updates/7/x86_64                 CentOS-7 - Updates                 1,041
   repolist: 11,428
   ```

   可以发现 `nginx repo` 已经安装到本机了。

2. #### 安装

   yum 安装 Nginx，非常简单，一条命令。

   ```bash
   sudo yum install nginx
   ```

3. #### 配置 Nginx 服务

   设置开机启动

   ```bash
   sudo systemctl enable nginx
   ```

   启动服务

   ```bash
   sudo systemctl start nginx
   ```

   停止服务

   ```bash
   sudo systemctl restart nginx
   ```

   重新加载，因为一般重新配置之后，不希望重启服务，这时可以使用重新加载。

   ```bash
   sudo systemctl reload nginx
   ```

4. #### 打开防火墙端口

   默认 CentOS7 使用的防火墙 firewalld 是关闭 http 服务的（打开 80 端口）。

   ```bash
   sudo firewall-cmd --zone=public --permanent --add-service=http
   success
   sudo firewall-cmd --reload
   success
   ```

   打开之后，可以查看一下防火墙打开的所有的服务

   ```bash
   sudo firewall-cmd --list-service
   ssh dhcpv6-client http
   ```

### 反向代理

Nginx 是一个很方便的反向代理，配置反向代理可以参考 [Module ngx_http_proxy_module](http://nginx.org/en/docs/http/ngx_http_proxy_module.html) 。本文不做累述。

需要指出的是 CentOS 7 的 SELinux，使用反向代理需要打开网络访问权限。

```bash
sudo setsebool -P httpd_can_network_connect on 
```

打开网络权限之后，反向代理可以使用了。

### 绑定其他端口

Nginx 默认绑定的端口是 http 协议的默认端口，端口号为：`80`，如果需要绑定其他端口，需要注意 SELinux 的配置

例如：绑定 8081 端口，但是会发现无法启动，一般的报错如下

```bash
YYYY/MM/DD hh:mm:ss [emerg] 46123#0: bind() to 0.0.0.0:8081 failed (13: Permission denied)
```

此时需要更改 SELinux 的设置。我们使用 SELinux 的管理工具 `semanage` 进行操作，比较方便。

安装 `semanage` 使用如下命令

```bash
sudo yum install policycoreutils-python
```

然后查看是否有其他协议类型使用了此端口

```bash
sudo semanage port -l | grep 8081
transproxy_port_t              tcp      8081
```

返回了结果，表明已经被其他类型占用了，类型为 `transproxy_port_t`。

我们还要查看一下 Nginx 的在 SELinux 中的类型 `http_port_t` 绑定的端口

```bash
sudo semanage port -l | grep http_port_t
http_port_t                    tcp      80, 81, 443, 488, 8008, 8009, 8443, 9000
pegasus_http_port_t            tcp      5988
```

第一行 `http_port_t` 中没有包含 `8081` 这个端口。因此需要修改 `8081` 端口到 `http_port_t` 类型中。

```bash
sudo semanage port -m -p tcp -t http_port_t 8081
```

如果没有其他协议类型使用想要绑定的端口，如 `8001`，则我们只要新增到 SELinux 中即可。

```bash
sudo semanage port -l | grep 8001
sudo semanage port -a -p tcp -t http_port_t 8001
```

此时，重新启动 Nginx 即可。