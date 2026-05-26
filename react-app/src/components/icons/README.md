# Icons

Use this folder as the single entry point for application icons.

## Add an icon

1. Import the Ant Design icon in `index.js` with an `Ant` prefix.
2. Export it with the app-facing name.
3. Import icons from this folder in feature files.

```js
import { DeleteOutlined as AntDeleteOutlined } from '@ant-design/icons'

export const DeleteOutlined = AntDeleteOutlined
```

## Replace an icon globally

Change the exported component in `index.js`.

```js
export const PlusOutlined = AntRocketOutlined
```

Avoid importing directly from `@ant-design/icons` outside this folder.
