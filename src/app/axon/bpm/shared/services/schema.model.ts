export interface SchemaSummary {
  id: string,
  name: string,
  description?: string,
  notation: string
  processDefinitions?: string
}

export interface Schema extends SchemaSummary{
  xml: string
}

export const NEW_BPMN_SCHEMA: Schema = {
  id: '',
  name: '',
  description: '',
  notation: 'BPMN',
  xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
    'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" ' +
    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
    'id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" ' +
    'exporter="Camunda Modeler" exporterVersion="1.11.3">\n' +
    '  <bpmn:process id="process" isExecutable="true">\n' +
    '    <bpmn:startEvent id="StartEvent_1" />\n' +
    '  </bpmn:process>\n' +
    '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process">\n' +
    '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
    '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
    '      </bpmndi:BPMNShape>\n' +
    '    </bpmndi:BPMNPlane>\n' +
    '  </bpmndi:BPMNDiagram>\n' +
    '</bpmn:definitions>',
  processDefinitions: 'process'

};
export const NEW_DMN_SCHEMA: Schema = {
  id: '',
  name: '',
  description: '',
  notation: 'DMN',
  xml: '<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" ' +
    'xmlns:biodi="http://bpmn.io/schema/dmn/biodi/1.0" id="definitions_0gqhztq" ' +
    'name="Decision" namespace="http://camunda.org/schema/1.0/dmn">\n' +
    '  <decision id="Decision_1">\n' +
    '    <extensionElements>\n' +
    '      <biodi:bounds x="200" y="200" width="180" height="80"/>\n' +
    '    </extensionElements>\n' +
    '    <decisionTable>\n' +
    '      <output typeRef="string" id="output_1" />\n' +
    '    </decisionTable>\n' +
    '  </decision>\n' +
    '</definitions>\n',
  processDefinitions: ''
};

export const NEW_CMMN_SCHEMA: Schema = {
  id: '',
  name: '',
  description: '',
  notation: 'CMMN',
  xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<cmmn:definitions xmlns:dc="http://www.omg.org/spec/CMMN/20151109/DC" ' +
    'xmlns:di="http://www.omg.org/spec/CMMN/20151109/DI" ' +
    'xmlns:cmmndi="http://www.omg.org/spec/CMMN/20151109/CMMNDI" ' +
    'xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'id="Test" targetNamespace="http://bpmn.io/schema/cmmn" ' +
    'exporter="Camunda Modeler" exporterVersion="1.11.3">\n' +
    '  <cmmn:case id="Case_1">\n' +
    '    <cmmn:casePlanModel id="CasePlanModel_1" name="A CasePlanModel">\n' +
    '      <cmmn:planItem id="PlanItem_1" definitionRef="Task_1" />\n' +
    '      <cmmn:task id="Task_1" />\n' +
    '    </cmmn:casePlanModel>\n' +
    '  </cmmn:case>\n' +
    '  <cmmndi:CMMNDI>\n' +
    '    <cmmndi:CMMNDiagram id="CMMN">\n' +
    '      <cmmndi:Size xsi:type="dc:Dimension" width="500" height="500" />\n' +
    '      <cmmndi:CMMNShape id="DI_CasePlanModel_1" cmmnElementRef="CasePlanModel_1">\n' +
    '        <dc:Bounds x="114" y="63" width="534" height="389" />\n' +
    '        <cmmndi:CMMNLabel />\n' +
    '      </cmmndi:CMMNShape>\n' +
    '      <cmmndi:CMMNShape id="PlanItem_1_di" cmmnElementRef="PlanItem_1">\n' +
    '        <dc:Bounds x="150" y="96" width="100" height="80" />\n' +
    '        <cmmndi:CMMNLabel />\n' +
    '      </cmmndi:CMMNShape>\n' +
    '    </cmmndi:CMMNDiagram>\n' +
    '  </cmmndi:CMMNDI>\n' +
    '</cmmn:definitions>\n',
  processDefinitions: ''
};

