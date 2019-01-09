import { Component, Input, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import {BpmnModelerModel} from './bpmn-modeler'

@Component({
  selector: 'axon-bpmn-edit',
  templateUrl: './bpmn-edit.component.html',
  styleUrls: ['./bpmn-edit.component.css']
})
export class BpmnEditComponent implements OnInit, OnChanges, AfterViewInit {
  bpmnModel: BpmnModelerModel

  @Input() schema = '';

  @ViewChild('canvasEl') canvasEl;
  @ViewChild('propertiesEl') propertiesEl;

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    const selector = document.querySelector('#canvas');
    const properties = document.querySelector('#properties');
    this.bpmnModel = new BpmnModelerModel({
      container: this.canvasEl.nativeElement,
      width: '100%',
      height: 'calc( 100vh - 40px - 14px - 64px - 14px )',
      keyboard: {
        bindTo: this.canvasEl.nativeElement,
      },
      propertiesPanel: {
        parent: this.propertiesEl.nativeElement
      }
    });
    if (this.schema !== '') {
      this.bpmnModel.importXML(this.schema)
    }
  }

  ngOnChanges(changes) {
    console.log('ngOnChanges0')
    if (changes.schema && changes.schema.currentValue ) {
       console.log('ngOnChanges')
       console.log(`[${changes.schema.currentValue}]`)
      if (this.bpmnModel) {
        this.bpmnModel.importXML(changes.schema.currentValue);
      }
    }
  }

  ngOnInit(): void {
  }
}
