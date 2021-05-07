'use strict';

// AlgoliaSearch https://github.com/algolia/algoliasearch-client-javascript
const algoliasearch = require('algoliasearch');

/**
 * Algolia Hook
 */

module.exports = strapi => {
  return {
    /**
     * Default options
     * This object is merged to strapi.config.hook.settings.algolia
     */
    defaults: {
      applicationId: '',
      apiKey: '',
      debug: false,
      prefix: strapi.config.environment,
    },

    /**
     * Initialize the hook
     */
    async initialize() {

      // Merging defaults and config/hook.json
      const { applicationId, apiKey, debug, prefix } = {
        ...this.defaults,
        ...strapi.config.hook.settings.algolia
      };

      const client = algoliasearch(applicationId, apiKey);

      const initIndex = (indexName) => {
        return client.initIndex(`${prefix}_${indexName}`);
      };

      strapi.services.algolia = {
        /**
         * Algoliasearch Client
         *
         * @type {algoliasearch.SearchClient};
         */
        client,

        /**
         * Saves the entity
         *
         * Should be called in the afterSave Lifecycle callback
         *
         * @param {object} model - the saved data of a Strapi model
         * @param {string} indexName
         */
        saveObject: function (model, indexName) {
          const object = {
            objectID: model.id,
            ...model
          };

          return initIndex(indexName).partialUpdateObject(object, { createIfNotExists: true })
            .then(() => {
              if (debug) strapi.log.debug(`Saved object: ${object.objectID} on the Algolia Index: ${indexName}`);
            })
            .catch(error => strapi.log.error(`Algolia Hook: ${error.message}`));
        },

        /**
         * Deletes the entity
         *
         * Should be called in the afterDelete Lifecycle callback
         *
         * @param {string} objectId
         * @param {string} indexName
         */
        deleteObject: function (objectId, indexName) {
          return initIndex(indexName).deleteObject(objectId)
            .then(() => {
              if (debug) strapi.log.debug(`Deleted object: ${objectId} on the Algolia Index: ${indexName}`);
            })
            .catch(error => strapi.log.error(`Algolia Hook: ${error.message}`));
        }
      };

      if (!applicationId.length || !apiKey.length) {
        strapi.log.error('Algolia Hook: Could not initialize: applicationId and apiKey must be defined');
      } else {
        await client.getApiKey(apiKey)
          .then(() => {
            if (debug) strapi.log.debug(`Successfully initialized Algolia service with applicationId: ${applicationId}`);
          })
          .catch(error => strapi.log.error(`Algolia Hook: Could not initialize: ${error.message}`));
      }
    }
  };
};
