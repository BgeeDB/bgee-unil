#HOW TO archive

## in src/config.json

- Set `"archive":` to `true`
- Use archived full URL in all `"*Domain":` attributes

## in productionCreation.js

- Comment the following `prod = false;` lines:
-- `if (config.archive)`
-- `if (scss.indexOf('$archive: false;') === -1)`
-- `if (pkg.homepage)`

## in src/styles/global.scss

- Set `$archive:` to `true`

## in package.json

- Set/Add an homepage attribute with the root path
e.g.
`"homepage": "/bgee15_0",`
