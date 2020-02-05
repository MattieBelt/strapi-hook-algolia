# strapi-hook-algolia

This hook allows you to use [Algolia](https://algolia.com/) as a service in Strapi. Algolia is a hosted search engine capable of delivering real-time results from the first keystroke. Algolia's powerful API lets you quickly and seamlessly implement search within your websites, mobile, and voice applications.

## Usage

1) [Create a Algolia account](https://www.algolia.com/users/sign_up)
2) Edit your config, add your own Application ID & Admin API Key
3) Use the algolia service in the [Lifecycle callbacks](https://strapi.io/documentation/3.0.0-beta.x/concepts/models.html#lifecycle-callbacks) of your Content type(s)

#### strapi.services.algolia

**saveObject** should be used in the Lifecycle callback _afterSave_. Fired after an `insert` or `update` query.
```
  afterSave: (model) => {
    strapi.services.algolia.saveObject(model, 'post');
  },
```

**deleteObject** should be used in the Lifecycle callback _afterDelete_. Fired after a `delete` query.
```
  afterDestroy: (model) => {
    strapi.services.algolia.deleteObject(model.id, 'information');
  },
```

## Strapi config

To activate and configure the hook with, you need to edit your ./config/hook.json file in your Strapi app.
```
{
  ...
  "algolia": {
    "enabled": true,
    "applicationId": "ABCDEFGHIJ",
    "apiKey": "secure_algolia_api_key",
    "debug": true,              // default: false
    "prefix": "my_own_prefix"   // default: Strapi envrionment (strapi.config.environment)
  }
}
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
