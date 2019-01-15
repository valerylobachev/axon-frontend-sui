import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SchemaBackendService} from '@app/axon/bpm/shared/services/schema-backend.service';
import {CreateSchema, InitSchema, UpdateSchema} from '@app/axon/bpm/shared/services/schema.actions';
import {select, Store} from '@ngrx/store';
import {BpmnEditComponent} from './bpmn-view/bpmn-edit.component';
import * as fromSchema from '@app/axon/bpm/shared/services/schema.reducer';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'axon-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  @ViewChild('bpmnEdit') bpmnEdit: BpmnEditComponent;

  formGroup: FormGroup;
  idControl: AbstractControl;
  nameControl: AbstractControl;
  descriptionControl: AbstractControl;
  notationControl: AbstractControl;
  xmlControl: AbstractControl;
  processDefinitionsControl: AbstractControl;

  action = '';
  id = '';

  loading = true;
  saving = false;
  saved = false;
  failure: any;

  designerActive = false;

  constructor(
    private schemaBackend: SchemaBackendService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.formGroup = this.fb.group({
      'id': [''],
      'name': ['', Validators.required],
      'description': [''],
      'notation': ['BPMN'],
      'xml': [''],
      'processDefinitions': ['']
    });

    this.idControl = this.formGroup.controls['id'];
    this.nameControl = this.formGroup.controls['name'];
    this.descriptionControl = this.formGroup.controls['description'];
    this.notationControl = this.formGroup.controls['notation'];
    this.xmlControl = this.formGroup.controls['xml'];
    this.processDefinitionsControl = this.formGroup.controls['processDefinitions'];

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.action = params['action'];
      this.id = params['id'];
      this.store.dispatch(new InitSchema({mode: this.action, id: this.id}));
    });

    this.store
      .pipe(select(fromSchema.selectEntity))
      .subscribe(entity => {
        if (entity) {
          this.formGroup.setValue(entity);
        }
      });

    this.store
      .pipe(select(fromSchema.selectLoadingState))
      .subscribe(res => {
        this.loading = res.loading;
        if (res.loadingFailure && res.loadingFailure.error) {
          this.failure = res.loadingFailure.error;
        } else {
          this.failure = null;
        }
      });

    this.store
      .pipe(select(fromSchema.selectSavingState))
      .subscribe(res => {
          console.log(`selectSavingAndSavingFailure: `);
          console.log(res);
          this.saving = res.saving;
          this.saved = res.saved;

          if (this.saved) {
            this.formGroup.markAsUntouched();
            this.formGroup.markAsPristine();
          }

          if (res.savingFailure && res.savingFailure.error) {
            this.failure = res.savingFailure.error;
          } else {
            this.failure = null;
          }
        }
      );
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.formGroup.dirty) {
      $event.returnValue = 'Schema changed. Are you sure to leave?';
    } else {
      $event.returnValue = true;
    }
  }

  save() {
    this.saved = false;
    const done = () => {
      if (this.action === 'create') {
        this.store.dispatch(new CreateSchema({schema: this.formGroup.value}));
      } else if (this.action === 'update') {
        this.store.dispatch(new UpdateSchema({
          schema: this.formGroup.value
        }));
      }
    };
    if (this.designerActive) {
      this.updateXml(done);
    } else {
      done();
    }

  }


  updateXml(callback) {
    this.bpmnEdit.bpmnModel.saveXML((err, xml) => {
        this.xmlControl.setValue(xml);
        this.processDefinitionsControl.setValue(this.bpmnEdit.bpmnModel.getProcessId());
        if (callback) {
          callback();
        }
      }
    );
  }

  processDefinitionsList() {
    const processDefinitions = this.processDefinitionsControl.value;
    if (processDefinitions && processDefinitions.length > 0) {
      return processDefinitions.split(' ');
    } else {
      return [];
    }
  }
}
