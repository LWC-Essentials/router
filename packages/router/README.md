# `@lwce/router`

A lightning web component for building declarative routing within
single-page applications.

## Usage

1. Install: `npm install --save @lwce/router`
2. Add `{"npm": "@lwce/router"}` to your `lwc.config.json` for module resolution. [See example](https://github.com/LWC-Essentials/router/blob/master/packages/sample-app/lwc.config.json)


Note: it is highly recommended that the `synthetic-shadow` be used.
Currently declarative routing is impossible with the native shadow dom,
because slotted elements are always rendered (whether active or not).

## API

### lwce-router
The primary component which must wrap all other components that have routing applied.

**Props:**

`base`: The base URL for all locations. If your app is served
from a sub-directory on your server, you’ll want to set this to the
sub-directory. A properly formatted basename should have a leading
slash, but no trailing slash.

Example:

```html
<lwce-router base="/my-app">
  ...
</lwce-router>
```

### lwce-route
Defines a route who's content will be rendered when the URL is active

**Props:**

`children`: Whatever HTML is passed within the slot will only be rendered if the URL is active.

`path`: Any valid URL path or array of paths that path-to-regexp@^1.7.0 understands.

`strict`: When true, a path that has a trailing slash will only match a
location.pathname with a trailing slash

`exact`: When true, will only match if the path matches the
location.pathname exactly

`sensitive`: When true, will match if the path is case sensitive.

`default`: When true, will match if no other paths are matched. Use for 404 pages.

Example:

```html
<lwce-route path="/products/:productId">
  <my-product></my-product>
</lwce-route>
```

### lwce-link
Define a link to navigate between your routes

**Props:**

`title`: The accessible text representing your link

`href`: A string representation of your destination. This can be a relative path.

`class-name`:  Set a class to style your link

Example:

```html
<lwce-link class-name="styled-link" path="/products/1234" title="Product details">
  Product details
</lwce-link>
```

### routeParams
Use the `routeParams` wire adapter to access URL parameters

Example:

```js
import { LightningElement, api, wire } from 'lwc';
import { routeParams } from '@lwce/router';

export default class Link extends LightningElement {
  @wire(routeParams) params;
}
```

And usage within the template:

```html
<template>
  <h1>Product: {params.productId}</h1>
</template>
```

### history
Use the `history` wire adapter to imperatively change routes.

Example:

```js
import { LightningElement, api, wire } from 'lwc';
import { history } from '@lwce/router';

export default class Link extends LightningElement {
  @wire(history) history;

  onClickHandler(e) {
    this.history.push('/settings');
  }
}
```
