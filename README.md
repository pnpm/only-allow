# only-allow

> Force a specific package manager to be used on a project

## Usage

Add a `preinstall` script to your project's `package.json`.

If you want to force [npm](https://docs.npmjs.com/cli/npm), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow@1.2.2 npm"
  }
}
```

If you want to force [cnpm](https://npmmirror.com/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow@1.2.2 cnpm"
  }
}
```

If you want to force [pnpm](https://pnpm.js.org/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow@1.2.2 pnpm"
  }
}
```

If you want to force [yarn](https://yarnpkg.com/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow@1.2.2 yarn"
  }
}
```

If you want to force [bun](https://bun.sh/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow@1.2.2 bun"
  }
}
```

If you want to force [deno](https://deno.land/), add:

```json
{
  "scripts": {
    "preinstall": "npx only-allow deno"
  }
}
```

## License

[MIT](LICENSE)
