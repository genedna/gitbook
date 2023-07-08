# Git - From Intern(al) To Expert

《Git - From Intern(al) To Expert》是一本关于 Git 的电子版书籍，从 Git 内部存储对象的存储格式，深入浅出讲解 Git 的原理，目标是帮助开发者理解 Git 的工作模式，在开发过程中更好的管理代码。

## 在线阅读

本项目在 DigitalOcean 上使用 App Platform 部署，访问地址：[https://gitbook.pub](https://gitbook.pub) 。

## 本地阅读

### 本地安装 Nodejs 环境

请在 Nodejs 官方网站下载安装包，下载地址：[https://nodejs.org/en/download/](https://nodejs.org/en/download/) 。

### 克隆仓库并启动本地服务

```bash
git clone https://github.com/genedna/gitbook.git
cd gitbook
npm install
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 观看本书内容。 

## 如何贡献

所有的内容都在 `/src` 目录夏，请修改该目录下的文件，然后提交 Pull Request。

### 修改页面左侧导航栏 - `/src/components/Navigation.jsx`

```
export const navigation = [];
```

## License

1. 模板是购买自 [Tailwind](https://tailwindui.com) ，模板使用遵循 [Tailwind UI license](LICENSE.md)。
2. 内容编写遵循 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh) 协议。
