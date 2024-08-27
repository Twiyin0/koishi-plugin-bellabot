# koishi-plugin-bellabot

[![npm](https://img.shields.io/npm/v/koishi-plugin-bellabot?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-bellabot)

开箱即用的插件合集

## 贝拉bot插件合集
* 贝拉Bot是暮色音铃(Twiyin0)自用的bot昵称，~~~从不同地方抄过来的插件~~~魔改自不同插件，开箱即用(指基础部分)。是个不错的娱乐~~~人工智障~~~小能手。
* 签到以及运势插件取自自己的bella-sign-in与jryspro，bilibili视频链接解析魔改自安妮(Anillc)的bilibili plugin for koishi.
* 签到插件UI借鉴Omega Miya。今日运势借鉴至fanlisky的运势插件
* 语音音源是桃井最中Monaka
* 你的网络需要友好于**jsdelivr**

## 基础功能
* 贝拉签到（核心）
- 没错就是bella-sign-in，此插件与与bella-sign-in不兼容，当然如果不想要此插件其他功能可能只安装bella-sign-in然后卸载掉这个插件
- 与bella-sign-in不同的是这个UI融合了jryspro
- 数据库依旧使用bella-sign-in，卸载掉bella-sign-in后此插件使用bella-sign-in的数据库

* 贝拉互动。贝拉的各种互动
- 召唤贝拉：使用"贝拉"，对贝拉进行召唤
- 发送“猫猫”可以获得猫猫图，也可能是其他萌宠也有可能是小柴郡
- 一图与一言，随机一张图图与随机一句话
- 贝拉唱歌：需要silk服务
- 老婆，早安，晚安的互动

* bilibili视频链接解析

## 附加功能（需要API,v0.0.0暂未加入该功能）
* deepseek AI聊天
* 根据pixiv的pid获取作品详细信息
* 根据keyword搜索相关pixiv图图（todo）
* 获取他用户收藏夹（todo）
* ......


# CHANGELOG

## v0.0.3
### 修复
* 修复了签到系统中商店购买长时间不输入内容会触发多次的问题
* 修复了积分补充的权限问题

## v0.0.2
### 更新
* 更新了版本号(bushi)

### 修复
* 修复文件不见了的问题

## v0.0.1
### 更新
* 更新了版本号(bushi)

### 修复
* 修复渲染图片完成后报错的问题


## v0.0.0
* 占个坑
* 加入基础部分，目前基础部分应该是能用了
