import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {
  CreateSchema, CreateSchemaFailure, CreateSchemaSuccess,
  DeleteSchema, DeleteSchemaFailure,
  DeleteSchemaSuccess,
  FindSchemas,
  FindSchemasFailure,
  FindSchemasSuccess, InitSchema, LoadSchema, LoadSchemaFailure, LoadSchemaSuccess,
  SchemaActionTypes, UpdateSchema, UpdateSchemaFailure, UpdateSchemaSuccess
} from './schema.actions';
import {of} from 'rxjs';
import {SchemaBackendService} from '@app/axon/bpm/shared/services/schema-backend.service';
import {Router} from '@angular/router';
import {NEW_BPMN_SCHEMA, NEW_CMMN_SCHEMA, NEW_DMN_SCHEMA} from '@app/axon/bpm/shared/services/schema.model';


@Injectable()
export class SchemaEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private schemaBackend: SchemaBackendService,
    private router: Router) {
  }

  @Effect()
  findSshemas$ = this.update$.pipe(
    ofType<FindSchemas>(SchemaActionTypes.FindSchemas),
    switchMap(action =>
      this.schemaBackend
        .find(action.payload.filter)
        .pipe(
          map(response => new FindSchemasSuccess({schemas: response})),
          catchError(failure =>
            of(new FindSchemasFailure({failure: failure.error}))
          )
        )
    )
  );

  @Effect()
  initSchema$ = this.update$.pipe(
    ofType<InitSchema>(SchemaActionTypes.InitSchema),
    map(action => {
        const mode = action.payload.mode;
        const id = action.payload.id;
        if (mode === 'create' && id === 'BPMN') {
          return new LoadSchemaSuccess({mode, schema: NEW_BPMN_SCHEMA});
        } else if (mode === 'create' && id === 'DMN') {
          return new LoadSchemaSuccess({mode, schema: NEW_DMN_SCHEMA});
        } else if (mode === 'create' && id === 'CMMN') {
          return new LoadSchemaSuccess({mode, schema: NEW_CMMN_SCHEMA});
        } else {
          return new LoadSchema({mode, id})
        }
      }
    )
  );


  @Effect()
  loadSchema$ = this.update$.pipe(
    ofType<LoadSchema>(SchemaActionTypes.LoadSchema),
    switchMap(action =>
      this.schemaBackend
        .findById(action.payload.id)
        .pipe(
          map(response =>
            new LoadSchemaSuccess({
              mode: action.payload.mode,
              schema: response
            })
          ),
          catchError(failure =>
            of(new LoadSchemaFailure({failure: failure}))
          )
        )
    )
  );

  @Effect()
  createSchema$ = this.update$.pipe(
    ofType<CreateSchema>(SchemaActionTypes.CreateSchema),
    switchMap(action =>
      this.schemaBackend
        .create(action.payload.schema)
        .pipe(
          map(response =>
            new CreateSchemaSuccess({
              schema: response
            })
          ),
          catchError(failure =>
            of(new CreateSchemaFailure({failure: failure}))
          )
        )
    )
  );

  @Effect({dispatch: false})
  createSchemaSuccess$ = this.update$
    .pipe(
      ofType<CreateSchemaSuccess>(SchemaActionTypes.CreateSchemaSuccess),
      tap(action =>
        this.router.navigate(['/bpm-config/schema/update', action.payload.schema.id])
      )
    );

  @Effect()
  updateSchema$ = this.update$.pipe(
    ofType<UpdateSchema>(SchemaActionTypes.UpdateSchema),
    switchMap(action =>
      this.schemaBackend
        .update(action.payload.schema)
        .pipe(
          map(response =>
            new UpdateSchemaSuccess({
              schema: response
            })
          ),
          catchError(failure =>
            of(new UpdateSchemaFailure({failure: failure}))
          )
        )
    )
  );

  @Effect()
  deleteSchema$ = this.update$.pipe(
    ofType<DeleteSchema>(SchemaActionTypes.DeleteSchema),
    switchMap(action =>
      this.schemaBackend
        .delete(action.payload.id)
        .pipe(
          map(response => new DeleteSchemaSuccess({id: action.payload.id})),
          catchError(failure =>
            of(new DeleteSchemaFailure({failure: failure}))
          )
        )
    )
  );

}
