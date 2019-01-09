import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms'
import {debounceTime} from 'rxjs/operators'
import {select, Store} from '@ngrx/store'
import {SchemaBackendService} from '@app/axon/bpm//shared/services/schema-backend.service'
import {SchemaSummary} from '@app/axon/bpm//shared/services/model'
import * as fromSchema from '../../shared/services/schema.reducer'
import {DeleteSchema, FindSchemas} from '../../shared/services/schema.actions'


@Component({
  selector: 'axon-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss']
})
export class SchemasComponent implements OnInit, OnDestroy {

  filter
  filterControl = new FormControl();
  private filterCtrlSub: any

  schemas: SchemaSummary[]

  loadingFailure: any

  constructor(private schemaBackend: SchemaBackendService,
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
        .pipe(select(fromSchema.selectLoadingFailure))
        .subscribe(
            loadingFailure => {
              console.log(`loadingFailure: `)
              console.log(loadingFailure)
              this.loadingFailure = loadingFailure
            }
        )
    this.store
        .pipe(select(fromSchema.selectAll))
        .subscribe(
            res => {
              // console.log('Schemas pipe:')
              // console.log(res)
              this.schemas = res
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


  delete(id: string) {
    this.store.dispatch(new DeleteSchema({id: id}));
  }

  clearFilter() {
    this.find('')
  }

  refresh() {
    this.find(this.filter)
  }
}
