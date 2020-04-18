import * as builder from "electron-builder";
const Platform = builder.Platform;

// 分析参数
const modeIndex = process.argv.findIndex(ele => {
  return ele == "--mode";
});

let isDevelopment = true;
if (modeIndex >= 0) {
  isDevelopment = process.argv[modeIndex + 1] !== "production";
} else {
  throw "未定义--mode， 默认mode";
}

// Promise is returned
builder
  .build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
      // publish: {
      //   provider: "generic",
      //   url: "http://10.0.60.57:17783/download"
      // },
      // productName: "AppStore",
      files: ["temp/**/*"],
      win: {
        target: isDevelopment
          ? [
              {
                target: "dir",
                arch: "x64"
              }
            ]
          : [
              {
                target: "nsis",
                arch: "x64"
              },
              {
                target: "nsis-web",
                arch: "x64"
              }
            ],
        icon: "public/icon.ico"
      },
      nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        perMachine: false
      },
      nsisWeb: {
        appPackageUrl: "https://www.baidu.com"
      }
    }
  })
  .then(res => {
    // handle result
    console.log(res);
  })
  .catch(error => {
    // handle error
    console.error(error);
  });
