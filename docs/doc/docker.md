# Docker

## CentOS中安装Docker的方法

1. 先删除旧的版本(如果没有可以跳过)

    ```bash
    sudo yum remove docker \
                    docker-client \
                    docker-client-latest \
                    docker-common \
                    docker-latest \
                    docker-latest-logrotate \
                    docker-logrotate \
                    docker-engine

    ```
    
2. 安装必须的依赖

   ```bsh
   sudo yum install -y yum-utils \
     device-mapper-persistent-data \
     lvm2
   ```

   添加`stable`的Docekr-ce的源

   ```bash
   sudo yum-config-manager \
       --add-repo \
       https://download.docker.com/linux/centos/docker-ce.repo
   ```

   

3. 安装`docker-ce`：

    ```bash
    sudo yum install docker-ce docker-ce-cli containerd.io
    ```

4. 选择指定的安装版本(可选)

    ```
    yum list docker-ce --showduplicates | sort -r
    
    docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
    docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
    docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
    docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable
    ```

    我们来举个例子，比如我们要安装`3:18.09.1-3.el7`这个版本，使用如下命令结构：

    ```bash
    sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
    ```

    命令说明：

    第一部分是`docker-ce`，第二部分是版本号`18.09.1`，看明白了吗？就是这样子：

    ```bash
    sudo yum install -y docker-ce-18.09.1 docker-ce-cli-18.09.1
    ```

5. 启动服务并测试一下：

    ```bash
    # 启动服务
    sudo systemctl start docker
    
    # 来一个Hello World吧
    sudo docker run hello-world
    Unable to find image 'hello-world:latest' locally
    latest: Pulling from library/hello-world
    1b930d010525: Pull complete
    Digest: sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
    Status: Downloaded newer image for hello-world:latest
    
    Hello from Docker!
    This message shows that your installation appears to be working correctly.
    
    To generate this message, Docker took the following steps:
     1. The Docker client contacted the Docker daemon.
     2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
        (amd64)
     3. The Docker daemon created a new container from that image which runs the
        executable that produces the output you are currently reading.
     4. The Docker daemon streamed that output to the Docker client, which sent it
        to your terminal.
    
    To try something more ambitious, you can run an Ubuntu container with:
     $ docker run -it ubuntu bash
    
    Share images, automate workflows, and more with a free Docker ID:
     https://hub.docker.com/
    
    For more examples and ideas, visit:
     https://docs.docker.com/get-started/
    ```

    如果看到上面的提示，说明Docker已经成功安装并运行了了。

6. 关于升级&删除：

    升级：

    ```bash
    # 更新所有
    yum -y update
    
    # 更新指定
    yum -y update docker-ce docker-ce-cli containerd.io
    ```

    删除：

    ```bash
    sudo yum remove docker-ce
    
    # 删除文件系统
    sudo rm -rf /var/lib/docker
    ```

## Docker修改镜像地址

1. 修改配置文件

    ```bash
    vi /etc/docker/daemon.json
    ```

    ```vim
    {
        "registry-mirrors": ["https://hub-mirror.c.163.com/"]
    }
    ```
    
2. 重启docker

    ```bash
    systemctl daemon-reload
    systemctl restart docker
    ```

## Docker-compose集合命令

ompose工具是一个`批量`工具，用于运行与管理多个`docker`容器。

官方文档：[Install Docker Compose](https://docs.docker.com/compose/install/)

1. 在Mac/Windows中，已经集成了docker-compose命令

2. 在WindowsServer中
   先启动PowerShell

   ```shell
   [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
   ```

   然后运行如下命令：

   ```shell
   Invoke-WebRequest "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-Windows-x86_64.exe" -UseBasicParsing -OutFile $Env:ProgramFiles\Docker\docker-compose.exe
   ```

   然后测试一下：`docker-compose --version`

3. Linux中：

   ```bash
   # 下载docker-compose
   curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
   
   # 给予执行权限
   sudo chmod +x /usr/local/bin/docker-compose
   
   # 测试命令
   $ docker-compose --version
   docker-compose version 1.25.5, build 8a1c60f6
   ```

## Doclever

1. 创建编辑一个`docker-compose`配置文件

   ```bash
   vi /home/doclever/docker-compose.yml
   ```

2. 保存以下内容

   ```yml
   version: "2"
   services:
     DOClever:
       image: lw96/doclever
       restart: always
       container_name: "DOClever"
       ports:
       - 10000:10000
       volumes:
       - /srv/doclever/file:/root/DOClever/data/file
       - /srv/doclever/img:/root/DOClever/data/img
       - /srv/doclever/tmp:/root/DOClever/data/tmp
       environment:
       - DB_HOST=mongodb://mongo:27017/DOClever
       - PORT=10000
       links:
       - mongo:mongo
   
     mongo:
       image: mongo:latest
       restart: always
       container_name: "mongodb"
       volumes:
       - /srv/doclever/db:/data/db
   ```

3. 切换到当前文件夹

   ```bsh
   cd /home/doclever/
   ```

4. 运行该脚本

   ```bash
   docker-compose -d up
   ```

## Showdoc

```bash
# 创建一个本地文件
mkdir -p /showdoc_deta/html

# 开放权限
chmod -R 777 /showdoc_data/

# docker 运行命令
docker run -d --name showdoc_test -p 13500:80 -v /showdoc_data/html/:/var/www/html/ star7th/showdoc

# 拷贝文件
docker exec showdoc_test \cp -fr /showdoc_data/html/ /var/www
```



## Mongo

[https://segmentfault.com/a/1190000015603831#item-0-3]

`docker-compose`配置`docker-compose.yml`

```yml
version: '3.1'

services: 
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example 
    ports:
      - 27017:27017
    volumes:
      - /home/mongodb:/data/db
```



```bash
docker exec -it 9f29c394b9ee /bin/bash

mongo

>use admin
# switched to db admin

> db.auth('root','example')
# 1
```



### 创建用户

```bash
db.createUser({
  user: "test",
  pwd: "123456",
  roles: [{ role: "dbOwner", db: "testdb" }]
});
```

### 备份数据

```bash
# 1.
docker exec -it [NAMES] mongodump -h localhost -u root -p example -o /tmp/test

# 2.将文件从容器拷贝到宿主机
docker cp [CONTAINER ID ]:/tmp/test /tmp/test
```

### 恢复数据

```bash
docker exec -it [NAMES] mongorestore -h localhost -u root -p example --dir /tmp/test
```



## Redis

`docker-compose`配置`docker-compose.yml`

```yml
version: "3"
services:
  redis-test:
    image: "redis"
    restart: always
    container_name: "redis-test"
    ports: 
      - 15001:6379
    volumes: 
      - /home/readistest:/data
    command:["redis-server","--requirepass","123456"]
```

进入命令行

```bash
# 进入镜像
docker exec -it redis-test /bin/bash

# 进入交互式终端
redis-cli

#退出终端
quit

#退出镜像
exit 
```

## mysql

`docker-compose.yml`

```yml
version: "3"
services: 
 db:
  restart: always
  container_name: mysql
  command: 
   --lower_case_table_names=1
   --character-set-server=utf8mb4
   --collation-server=utf8mb4_general_ci
   --explicit_defaults_for_timestamp=true
  image: mysql
  environment:
   TZ: Asia/Shanghai
   MYSQL_ROOT_PASSWORD: example
  ports:
   - 3306:3306
  volumes: 
   - /home/mysql/data:/var/lib/mysql
   - /home/mysql/config:/etc/mysql/conf.d
```

## Jenkins

`docker-compose.yml`

```yml
version: '3'
services:
  jenkins: 
    container_name: 'jenkins'
    image: jenkins/jenkins:lts
    restart: always
    user: jenkins:994
    ports: 
    - "11005:8080"
    - "50000:50000"
    - "10051:10051"
    volumes:
    - /home/jenkins/data:/var/jenkins_home
    - /usr/bin/docker:/usr/bin/docker
    - /var/run/docker.sock:/var/run/docker.sock
```

