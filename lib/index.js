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

      // Merging defaults en config/hook.json
      const settings = {
        ...this.defaults,
        ...strapi.config.hook.settings.algolia
      };

      if (!settings.applicationId.length && !settings.apiKey.length) {
        throw Error('Algolia Hook: Could not initialize: applicationId and apiKey must be defined');
      }

      const client = algoliasearch(settings.applicationId, settings.apiKey);

      const initIndex = (indexName) => {
        return client.initIndex(`${settings.prefix}_${indexName.toUpperCase()}`);
      };

      strapi.services.algolia = {

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

          initIndex(indexName).partialUpdateObject(object, {createIfNotExists: true})
            .then(() => {
              if (settings.debug) strapi.log.debug(`Saved object: ${object.objectID} on the Algolia Index: ${indexName}`);
            })
            .catch(error => {
              strapi.log.error(`Algolia Hook: ${error.message}`);
            });
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
          initIndex(indexName).deleteObject(objectId)
            .then(() => {
              if (settings.debug) strapi.log.debug(`Deleted object: ${objectId} on the Algolia Index: ${indexName}`);
            })
            .catch(error => {
              strapi.log.error(`Algolia Hook: ${error.message}`);
            });
        }
      };

      if (settings.debug) strapi.log.debug(`Successfully initialized Algolia service with applicationId: ${settings.applicationId}`);
    }
  };
};
