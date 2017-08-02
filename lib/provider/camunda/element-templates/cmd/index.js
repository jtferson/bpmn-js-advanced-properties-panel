'use strict';

var ChangeElementTemplateHandler = require('./ChangeElementTemplateHandler');

var getTemplate = require('../Helper').getTemplate,
    getDefaultTemplate = require('../Helper').getDefaultTemplate;

function registerHandlers(commandStack, elementTemplates, eventBus, elementRegistry) {
  commandStack.registerHandler(
    'propertiesPanel.camunda.changeTemplate',
    ChangeElementTemplateHandler
  );

  // apply default element templates on shape creation
  eventBus.on([ 'commandStack.shape.create.postExecuted' ], function(context) {
    applyDefaultTemplate(context.context.shape, elementTemplates, commandStack);
  });

  // apply default element templates on connection creation
  eventBus.on([ 'commandStack.connection.create.postExecuted' ], function(context) {
    applyDefaultTemplate(context.context.connection, elementTemplates, commandStack);
  });



  eventBus.on('import.done', function(event) {


    if (!event.isInitial) {
      return;
    }

    var startEvent = elementRegistry.get('StartEvent_1');

    var startEventTemplate = getDefaultTemplate(startEvent, elementTemplates);

    if (startEventTemplate) {
      applyDefaultTemplate(startEvent, elementTemplates, commandStack);
    }


  });
/*
    if (defaultTemplate.appliesTo.indexOf('bpmn:StartEvent') !== -1) {
      var startEvent = elementRegistry.get('StartEvent_1');

      applyDefaultTemplate(startEvent, elementTemplates, commandStack);
    }

    if (defaultTemplate.appliesTo.indexOf('bpmn:Process') !== -1) {
      var rootElement = canvas.getRootElement();

      applyDefaultTemplate(rootElement, elementTemplates, commandStack);
    }
    */
  // });
}

registerHandlers.$inject = [ 'commandStack', 'elementTemplates', 'eventBus', 'elementRegistry' ];


module.exports = {
  __init__: [ registerHandlers ]
};


function applyDefaultTemplate(element, elementTemplates, commandStack) {

  if (!getTemplate(element, elementTemplates)
      && getDefaultTemplate(element, elementTemplates)) {

    var command = 'propertiesPanel.camunda.changeTemplate';
    var commandContext = {
      element: element,
      newTemplate: getDefaultTemplate(element, elementTemplates)
    };

    commandStack.execute(command, commandContext);
  }
}
