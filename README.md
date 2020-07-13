# strapi-hook-algolia

This hook allows you to use [Algolia](https://algolia.com/) as a service in [Strapi](https://github.com/strapi/strapi) `strapi.services.algolia`. Algolia is a hosted search engine capable of delivering real-time results from the first keystroke. Algolia's powerful API lets you quickly and seamlessly implement search within your websites, mobile, and voice applications.

## Installation

```bash
# using yarn
yarn add strapi-hook-algolia

# using npm
npm install strapi-hook-algolia --save
```

## Usage

1) [Create a Algolia account](https://www.algolia.com/users/sign_up)
2) [Edit your config](#hook-config), add your own Application ID & Admin API Key
3) Use the algolia service in the [Lifecycle callbacks](https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks) of your ContentType

**saveObject()** should be used in the Lifecycle callback `afterCreate`, fired after an _insert_, and `afterUpdate`, fired after an _update_.
```js
  afterCreate(result, data) {
    strapi.services.algolia.saveObject(result, 'index');
  }
```
```js
  afterUpdate(result, params, data) {
    strapi.services.algolia.saveObject(result, 'index');
  }
```

**deleteObject()** should be used in the Lifecycle callback `afterDelete`, fired after a _delete_ query.
```js
  afterDelete(result, params) {
    strapi.services.algolia.deleteObject(result.id, 'index');
  }
```

**Full Example**

```js
const index = 'post';

module.exports = {
  lifecycles: {
    afterCreate(result, data) {
      strapi.services.algolia.saveObject(result, index);
    },
    afterUpdate(result, params, data) {
      strapi.services.algolia.saveObject(result, index);
    },
    afterDelete(result, params) {
      strapi.services.algolia.deleteObject(result.id, index);
    },
  },
};
```

## Hook config

To activate and configure the hook, you need to create or update the file `./config/hook.js` in your strapi app.

```js
  module.exports = {
    settings: {
      // ...
      algolia: {
        enabled: true,
        applicationId: 'ABCDEFGHIJ',
        apiKey: 'secure_algolia_admin_api_key',
        debug: true,              // default: false
        prefix: 'my_own_prefix'   // default: Strapi environment (strapi.config.environment)
      },
    }
  };
```

### Resources

- [MIT License](LICENSE.md)

### Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
