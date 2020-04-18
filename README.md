# longyi-desktop-app-template

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## electron 安装问题

1. 改成淘宝镜像

   [`node_modules\@electron\get\dist\cjs\artifact-utils.js`](node_modules/@electron/get/dist/cjs/artifact-utils.js)

   ```js
   //function getArtifactRemoteURL(details) {
       ...
       // return `${base}${path.slice(1)}/${file}`;
       // change to
       return `${"https://npm.taobao.org/mirrors/electron/"}${path.slice(1)}/${file}`;
   //}
   ```

2. 然后添加`npm`脚本并执行

   ```json
   {
     "scripts": {
       "electron:install": "cd node_modules/electron/ && node install.js && cd ../../"
     }
   }
   ```

   ```sh
   npm run electron:install
   # or
   yarn electron:install
   ```

## electron builder

1. 可以解决下载前缀问题

```sh
npm set electron_mirror=https://npm.taobao.org/mirrors/electron/
```

## bash 乱码

```sh
 chcp 65001
```
