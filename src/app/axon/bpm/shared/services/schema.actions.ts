import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Schema, SchemaSummary} from './schema.model';

export enum SchemaActionTypes {
  FindSchemas = '[Schema] Find Schemas',
  FindSchemasSuccess = '[Schema] Find Schemas Success',
  FindSchemasFailure = '[Schema] Find Schemas Failure',
  ToggleSchemaSort = '[Schema] Toggle Sort',

  InitSchema = '[Schema] Init Schema',
  LoadSchema = '[Schema] Load Schema',
  LoadSchemaSuccess = '[Schema] Load Schema Success',
  LoadSchemaFailure = '[Schema] Load Schema Failure',

  CreateSchema = '[Schema] Create Schema',
  CreateSchemaSuccess = '[Schema] Create Schema Success',
  CreateSchemaFailure = '[Schema] Create Schema Failure',

  UpdateSchema = '[Schema] Update Schema',
  UpdateSchemaSuccess = '[Schema] Update Schema Success',
  UpdateSchemaFailure = '[Schema] Update Schema Failure',

  DeleteSchema = '[Schema] Delete Schema',
  DeleteSchemaSuccess = '[Schema] Delete Schema Success',
  DeleteSchemaFailure = '[Schema] Delete Schema Failure'
}

export class FindSchemas implements Action {
  readonly type = SchemaActionTypes.FindSchemas;

  constructor(public payload: { filter: string }) {
  }
}

export class FindSchemasSuccess implements Action {
  readonly type = SchemaActionTypes.FindSchemasSuccess;

  constructor(public payload: { schemas: SchemaSummary[] }) {
  }
}

export class FindSchemasFailure implements Action {
  readonly type = SchemaActionTypes.FindSchemasFailure;

  constructor(public payload: { failure: any }) {
  }
}

export class ToggleSchemaSort implements Action {
  readonly type = SchemaActionTypes.ToggleSchemaSort;

  constructor(public payload: { field: string }) {
  }
}

export class InitSchema implements Action {
  readonly type = SchemaActionTypes.InitSchema;

  constructor(public payload: { mode: string, id: string }) {
  }
}

export class LoadSchema implements Action {
  readonly type = SchemaActionTypes.LoadSchema;

  constructor(public payload: { mode: string, id: string }) {
  }
}

export class LoadSchemaSuccess implements Action {
  readonly type = SchemaActionTypes.LoadSchemaSuccess;

  constructor(public payload: { mode: string, schema: Schema }) {
  }
}

export class LoadSchemaFailure implements Action {
  readonly type = SchemaActionTypes.LoadSchemaFailure;

  constructor(public payload: { failure: any }) {
  }
}


export class CreateSchema implements Action {
  readonly type = SchemaActionTypes.CreateSchema;

  constructor(public payload: { schema: Schema }) {
  }
}

export class CreateSchemaSuccess implements Action {
  readonly type = SchemaActionTypes.CreateSchemaSuccess;

  constructor(public payload: { schema: SchemaSummary }) {
  }
}

export class CreateSchemaFailure implements Action {
  readonly type = SchemaActionTypes.CreateSchemaFailure;

  constructor(public payload: { failure: any }) {
  }
}


export class UpdateSchema implements Action {
  readonly type = SchemaActionTypes.UpdateSchema;

  constructor(public payload: { schema: Schema }) {
  }
}

export class UpdateSchemaSuccess implements Action {
  readonly type = SchemaActionTypes.UpdateSchemaSuccess;

  constructor(public payload: { schema: SchemaSummary }) {
  }
}

export class UpdateSchemaFailure implements Action {
  readonly type = SchemaActionTypes.UpdateSchemaFailure;

  constructor(public payload: { failure: any }) {
  }
}

export class DeleteSchema implements Action {
  readonly type = SchemaActionTypes.DeleteSchema;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteSchemaSuccess implements Action {
  readonly type = SchemaActionTypes.DeleteSchemaSuccess;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteSchemaFailure implements Action {
  readonly type = SchemaActionTypes.DeleteSchemaFailure;

  constructor(public payload: { failure: any }) {
  }
}


export type SchemaActions =
  FindSchemas
  | FindSchemasSuccess
  | FindSchemasFailure
  | ToggleSchemaSort
  | InitSchema
  | LoadSchema
  | LoadSchemaSuccess
  | LoadSchemaFailure
  | CreateSchema
  | CreateSchemaSuccess
  | CreateSchemaFailure
  | UpdateSchema
  | UpdateSchemaSuccess
  | UpdateSchemaFailure
  | DeleteSchema
  | DeleteSchemaSuccess
  | DeleteSchemaFailure;
