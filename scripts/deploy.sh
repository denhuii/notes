#!/bin/sh
# 构想 https://gist.github.com/motemen/8595451

# 基于 https://github.com/eldarlabs/ghpages-deploy-script/blob/master/scripts/deploy-ghpages.sh
# MIT许可 https://github.com/eldarlabs/ghpages-deploy-script/blob/master/LICENSE

# abort the script if there is a non-zero error
set -e

# 创建的一个新的仓库
# 设置发布的用户名与邮箱
git config --global user.email "$GH_EMAIL" >/dev/null 2>&1
git config --global user.name "$GH_NAME" >/dev/null 2>&1


echo 'email is: '$GH_EMAIL
echo 'name is: '$GH_NAME
echo 'sitesource is: '$siteSource


# 把构建好的文件目录给拷贝进来
cd "../docs/.vuepress/${siteSource}/"

pwd

ls -la

# git init

# # 把所有的文件添加到git
# git add -A


# # 推送文件
# git push -f git@github.com:denhuii/denhuii.github.io.git master
# # 资源回收，删除临时分支与目录
# cd ..
# rm -rf gh-pages-branch

echo "Finished Deployment!"