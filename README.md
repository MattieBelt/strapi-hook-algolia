# strapi-hook-algolia

<a href="https://www.npmjs.org/package/strapi-hook-algolia">
    <img src="https://img.shields.io/npm/v/strapi-hook-algolia" alt="NPM Version" />
</a>
<a href="https://www.npmjs.org/package/strapi-hook-algolia">
    <img src="https://img.shields.io/npm/dm/strapi-hook-algolia.svg" alt="Monthly download on NPM" />
</a>

This hook allows you to use [Algolia](https://algolia.com/) as a service in [Strapi](https://github.com/strapi/strapi) `strapi.services.algolia`. Algolia is a hosted search engine capable of delivering real-time results from the first keystroke. Algolia's powerful API lets you quickly and seamlessly implement search within your websites, mobile, and voice applications.

**Supported Strapi versions:**

* v3.6.x (recommended)
* v3.x

_Older version may work with the beta version of this hook, but are not supported._ 

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
3) Use the algolia service in the [Lifecycle hooks](https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks) of your ContentType

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

**Full example**

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

**Draft & publish example**  
Here is an example on how to only index published entries, for when using [the draft and publish feature](https://strapi.io/documentation/v3.x/concepts/draft-and-publish.html#draft-and-publish).

```js
const index = 'post';

module.exports = {
  lifecycles: {
    afterUpdate(result, params, data) {
      if (result.published_at) {
        strapi.services.algolia.saveObject(result, index);
      } else {
        strapi.services.algolia.deleteObject(result.id, index);
      }
    },
    afterDelete(result, params) {
      strapi.services.algolia.deleteObject(result.id, index);
    },
  },
};
```

**Using the algoliasearch client**  
You can access the algolia javascript client, read the [official documentation](https://www.algolia.com/doc/api-reference/api-methods/) to know more.

```js
/**
 * api/my-model/controllers/my-model.js
 */

module.exports = {
  async myController(ctx) {
    // ...

    // https://www.algolia.com/doc/api-reference/api-methods/
    const { client } = strapi.services.algolia
    await client.listIndices()

    // ...
  },
}
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

### Support
- [Strapi community on Slack](http://slack.strapi.io), feel free to DM me (@MattieBelt).
- [GitHub issues](https://github.com/MattieBelt/strapi-hook-algolia/issues) for bugs 🐛, contributions 🔧 or just anything to discuss 💬.

### Resources
- [Strapi website](http://strapi.io/)
- [Strapi forum](https://forum.strapi.io/)
- [Strapi news on Twitter](https://twitter.com/strapijs)

### License 
- Copyright (c) 2020-2021 Mattias van den Belt & Strapi Solutions ([MIT License](LICENSE.md)).
