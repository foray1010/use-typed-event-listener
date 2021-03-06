'use strict'

module.exports = {
  '*.{cjs,js,mjs,ts,tsx}': [
    'yarn prettier --write',
    'yarn eslint --fix',
    'jest --bail --findRelatedTests',
  ],
  '*.{json,yaml,yml}': 'yarn prettier --write',
  '*.{markdown,md}'(filenames) {
    return [`yarn prettier --write ${filenames.join(' ')}`, 'yarn remark .']
  },
}
