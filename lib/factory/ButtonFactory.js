'use strict';

/**
 * Button factory
 * 
 * 
 * 
 *
 * @param  {Object} options
 * @param  {string} options.id
 * @param  {string} [options.labelText]
 * @param  {Function} [options.get]
 * @param  {Function} [options.showLabel]
 * @param  {Boolean} [options.divider] adds a divider at the top of the label if true; default: false
 */
var button = function(options) {
  return {
    id: options.id,
    label: options.label,
    html: '<button type="button" data-value="button" ' +
            'data-show="showButton" ' +
            'class="entry-button' + (options.divider ? ' divider' : '') + '">' +
            options.label +
          '</button>',
    get: function(element, node) {
      if (typeof options.get === 'function') {
        return options.get(element, node);
      }
      return { button: options.buttonText };
    },
    showButton: function(element, node) {
      if (typeof options.showButton === 'function') {
        return options.showButton(element, node);
      }
      return true;
    }
  };
};

module.exports = button;
