# Icons

Use this folder as the single entry point for application icons. App icons are
rendered from local SVG files in `svg/`, not imported directly from
`@ant-design/icons`.

SVG files use the same PascalCase names as the app icon exports:

- `svg/PlusOutlined.svg`
- `svg/CheckCircleOutlined.svg`
- `svg/StarFilled.svg`

Normalize uploaded SVGs before adding them:

- use PascalCase Ant-style names, such as `FileCodeOutlined.svg`
- remove fixed `width` and `height`
- keep the root `viewBox`
- use `currentColor` for visible `fill` or `stroke`

## Add an icon

1. Add the SVG file to `svg/` using the app icon name.
2. Import the SVG in `index.jsx` with `?raw`.
3. Export it with `createIcon`.
4. Import icons from this folder in feature files.

```js
import deleteOutlinedSvg from './svg/DeleteOutlined.svg?raw'

export const DeleteOutlined = createIcon(deleteOutlinedSvg)
```

## Replace an icon globally

Change the SVG assigned to the exported component in `index.jsx`.

```js
export const PlusOutlined = createIcon(rocketOutlinedSvg)
```

Avoid importing directly from `@ant-design/icons` in application code.
