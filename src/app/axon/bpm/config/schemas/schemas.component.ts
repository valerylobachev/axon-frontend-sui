import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms'
import {debounceTime} from 'rxjs/operators'
import {select, Store} from '@ngrx/store'
import {SchemaBackendService} from '@app/axon/bpm/shared/services/schema-backend.service'
import {SchemaSummary} from '@app/axon/bpm/shared/services/schema.model'
import * as fromSchema from '@app/axon/bpm/shared/services/schema.reducer'
import {DeleteSchema, FindSchemas, ToggleSchemaSort} from '@app/axon/bpm/shared/services/schema.actions';
import {ModalSize, ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';

export interface IContext {
  id: string;
  name: string
}

@Component({
  selector: 'axon-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SchemasComponent implements OnInit, OnDestroy {

  filter
  filterControl = new FormControl();
  private filterCtrlSub: any

  schemas: SchemaSummary[]

  failure: any

  sortField: string = null
  sortAscending = false


  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>

  constructor(private schemaBackend: SchemaBackendService,
              public modalService: SuiModalService,
              private store: Store<any>) {
  }

  ngOnInit() {

    this.store.pipe(select(fromSchema.selectFilter))
        .subscribe(
            res => {
              // console.log(`Filter pipe: ${res}`)
              this.filter = res
            }
        )

    this.store
        .pipe(select(fromSchema.selectEntitiesLoadingFailure))
        .subscribe(
            loadingFailure => {
              console.log(`loadingFailure: `)
              console.log(loadingFailure)
              this.failure = loadingFailure
            }
        )


    this.store
      .pipe(select(fromSchema.selectSavingState))
      .subscribe(
        res => {
          if (res.savingFailure && res.savingFailure.error) {
            this.failure = res.savingFailure.error
          }
        }
      )


    this.store
        .pipe(select(fromSchema.selectSortState))
        .subscribe(
            res => {
              this.sortField = res.sortField;
              this.sortAscending = res.sortAscending;
              this.schemas = res.sortedEntities
            }
        )

    this.filterCtrlSub = this.filterControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe(newFilter => this.find(newFilter))
  }

  ngOnDestroy() {
    this.filterCtrlSub.unsubscribe();
  }


  private find(newFilter: string) {
    // console.log(`new filter: ${newFilter}`)
    this.store.dispatch(new FindSchemas({filter: newFilter}));
  }


  delete(id: string, name: string) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.size = ModalSize.Mini;
    config.closeResult = 'closed!';
    config.context = { id: id, name: name };

    this.modalService
      .open(config)
      .onApprove(result => { this.store.dispatch(new DeleteSchema({id: id})); } )
      // .onDeny(result => { console.log(result) });
  }

  clearFilter() {
    this.find('')
  }

  refresh() {
    this.find(this.filter)
  }

  toggleSort(field: string) {
    this.store.dispatch(new ToggleSchemaSort({field: field}));
  }

  processDefinitionsList(schema: SchemaSummary) {
    if (schema && schema.processDefinitions && schema.processDefinitions.length > 0) {
      return schema.processDefinitions.split(' ')
    } else {
      return []
    }
  }
}
