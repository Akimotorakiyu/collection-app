import * as path from "path";
import * as webpack from "webpack";
import * as webpackElectronReload from "webpack-electron-reload";

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

const ElectronReloadPlugin = (webpackElectronReload as any)({
  path: path.join("./temp/backend.js")
});

const plugins: webpack.Plugin[] = [];
if (isDevelopment) {
  plugins.push(ElectronReloadPlugin());
}

const config: webpack.Configuration = {
  entry: {
    backend: "./backend/index.ts",
    preload: "./preload/preload.ts"
  },
  devtool: "inline-source-map",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve("temp")
  },
  plugins
};

export default config;
