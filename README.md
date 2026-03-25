# @harvey0379/vite-ts-cli

基于 **Vite + TypeScript** 的简单 CLI 模板，包含：

- CLI 源码与构建配置
- GitHub Release 自动发布
- GitHub Actions 自动发布 npm（`@harvey0379` 命名空间）

## 使用

### 本地开发

```bash
npm install
npm run build
node dist/index.js --name=Harvey
```

或通过 bin 名称执行（全局安装或 npm link 后）：

```bash
harvey-cli --name=Harvey
```

## 发布流程

### 1) GitHub Release

推送 tag 后会自动创建 release：

```bash
git tag v0.1.0
git push origin v0.1.0
```

### 2) GitHub Actions 发布 npm

当发布 release（`published`）时，会自动执行 npm publish。

需要在仓库 `Settings > Secrets and variables > Actions` 中添加：

- `NPM_TOKEN`: npm access token（需有 publish 权限）

包名当前为：

- `@harvey0379/vite-ts-cli`
