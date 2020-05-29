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

3. 复制 `ide-rsa`中的内容到服务器`~/.ssh/authourized_keys`中

   ```bash
   vi authourized_keys
   ```

4. `vim`编辑本地`.ssh`目录中的config

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