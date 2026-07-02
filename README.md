# Niya Anime Homepage

一个二次元风格的个人主页，用来展示 Niya 的前端创作、界面设计、插画分镜、创作日记，以及一个可以播放本地音频的「月色音乐盒」。

## 在线访问

GitHub Pages 开启后，页面地址预计为：

```text
https://harry134915.github.io/niya-anime-homepage/
```

如果刚开启 Pages 后暂时打不开，等待 1-3 分钟再刷新。

## 本地运行

项目是纯静态网站，不需要安装依赖。推荐用 Node.js 启动本地静态服务器：

```bash
node server.mjs
```

然后打开：

```text
http://localhost:5177
```

也可以直接双击 `index.html` 预览页面，但音频和部分浏览器能力用本地服务器打开会更稳定。

## 文件结构

```text
index.html       页面结构和 SEO 信息
styles.css       视觉样式、响应式布局和夜间模式
script.js        导航、作品切换、播放器和按钮交互
server.mjs       本地静态服务器
favicon.svg      网站图标
assets/          图片和音频资源
```

## 月色音乐盒音频

播放器会读取 `assets/audio/` 下的三首音频：

```text
moonlit-room.mp3
starlight-loop.mp3
pixel-rain.mp3
```

如果音频文件缺失，播放器会显示友好提示，页面其他交互仍然可用。

## GitHub Pages 发布

1. 将本仓库 Push 到 GitHub。
2. 打开仓库页面：`Settings` -> `Pages`。
3. Source 选择 `Deploy from a branch`。
4. Branch 选择 `main`，Folder 选择 `/root`。
5. 保存后等待部署完成。

## 发布资源说明

线上仓库只保留页面实际引用的展示资源。图片优先使用压缩后的 JPG，未使用的 PNG 原图不放入发布包。

这是一个展示型静态作品。公开发布时，请确认放入 ssets/audio/ 的音乐文件拥有可分享或可公开使用的授权。

