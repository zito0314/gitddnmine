# Icons

Use this folder as the single entry point for application icons. App icons are
rendered from local SVG files in `svg/`, not imported directly from
`@ant-design/icons`.

## Add an icon

1. Add the SVG file to `svg/`.
2. Import the SVG in `index.jsx` with `?raw`.
3. Export it with `createIcon`.
4. Import icons from this folder in feature files.

```js
import deleteOutlinedSvg from './svg/delete-outlined.svg?raw'

export const DeleteOutlined = createIcon(deleteOutlinedSvg)
```

## Replace an icon globally

Change the SVG assigned to the exported component in `index.jsx`.

```js
export const PlusOutlined = createIcon(rocketOutlinedSvg)
```

Avoid importing directly from `@ant-design/icons` in application code.
