# @doochik/eslint-plugin-location

ESLint plugin for [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location).

## Installation

```
$ npm install --save-dev @doochik/eslint-plugin-location
```

## Usage

Add `@doochik/eslint-plugin-location` to the plugins section of your `.eslintrc` configuration file:

```json
{
    "plugins": [
        "@doochik/eslint-plugin-location"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@doochik/location/prefer-new-url": "error"
    }
}
```

### Rule "location/prefer-new-url"

`location/prefer-new-url` Forbid `location.href.replace()` in favor `new URL()`.

Bad examples:
```javascript
location.replace.href.replace('foo', 'bar')
```

Good examples:
```javascript
location.replace('https://example.com')
location.href = new URL('https://example.com');
location = new URL('https://example.com');
```
