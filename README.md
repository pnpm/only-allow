# only-allow2
需求来源于业务：https://juejin.cn/post/7067198104092540935

> Force a specific package manager and **it's version** to be used on a project

## Usage

Add a `preinstall` script to your project's `package.json`.

support:
- npm
- cnpm
- yarn
- pnpm

If you want to force [npm](https://docs.npmjs.com/cli/npm), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow2 npm"
  }
}
```

If you want to force package manager `version`, add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow2 pnpm@6.10.3"
  }
}
```

## License

[MIT](LICENSE)
