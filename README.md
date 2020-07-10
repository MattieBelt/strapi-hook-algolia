# strapi-hook-algolia

This hook allows you to use [Algolia](https://algolia.com/) as a service in Strapi. Algolia is a hosted search engine capable of delivering real-time results from the first keystroke. Algolia's powerful API lets you quickly and seamlessly implement search within your websites, mobile, and voice applications.

## Usage

1) [Create a Algolia account](https://www.algolia.com/users/sign_up)
2) Edit your config, add your own Application ID & Admin API Key
3) Use the algolia service in the [Lifecycle callbacks](https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks) of your Content type(s)

#### strapi.services.algolia

**saveObject** should be used in the Lifecycle callback _afterCreate. Fired after an `insert`.
```js
  afterCreate(result) {
    strapi.services.algolia.saveObject(result, index);
  },
```

**updateObject** should be used in the Lifecycle callback _afterSave_. Fired after an `update` query.

```js
  afterCreate(result) {
    strapi.services.algolia.saveObject(result, index);
  },
```

**deleteObject** should be used in the Lifecycle callback _afterDelete_. Fired after a `delete` query.
```js
  afterDelete: (result) => {
    strapi.services.algolia.deleteObject(result.id, 'information');
  },
```

**Full Example**

```js
const index = 'post';

module.exports = {
  lifecycles: {
    afterCreate(result) {
      strapi.services.algolia.saveObject(result, index);
    },
    afterUpdate(result, params, data) {
      strapi.services.algolia.saveObject(result, index);
    },
    afterDelete(result, params, data) {
      strapi.services.algolia.deleteObject(result.id, index);
    },
  },
};
```

## Strapi config

To activate and configure the hook, you need to create or update the file _./config/hook.js_ in your strapi app.

```js
  module.exports = {
    settings: {
      ...
      "algolia": {
        "enabled": true,
        "applicationId": "ABCDEFGHIJ",
        "apiKey": "secure_algolia_api_key",
        "debug": true,              // default: false
        "prefix": "my_own_prefix"   // default: Strapi environment (strapi.config.environment)
      },
    }
  };
```

## Installation

```bash
npm i strapi-hook-algolia
```

### Resources

- [MIT License](LICENSE.md)

### Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
