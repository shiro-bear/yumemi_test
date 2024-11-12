module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // .tsx や .js ファイルをbabel-jestで処理
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|other-module-to-transform).*\\.js$", // axiosもトランスパイル対象にする
  ],
  testEnvironment: "jsdom",
};
