import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {SchemaActions, SchemaActionTypes} from './schema.actions';
import {createFeatureSelector} from '@ngrx/store';
import {NEW_BPMN_SCHEMA, NEW_CMMN_SCHEMA, NEW_DMN_SCHEMA, Schema, SchemaSummary} from './schema.model';
import {UUID} from 'angular2-uuid';

export interface State extends EntityState<SchemaSummary> {
  // additional entities state properties
  filter: string;
  entitiesLoading: boolean;
  entitiesLoadingFailure: any;

  sortField: string
  sortAscending: boolean
  sortedEntities: SchemaSummary[]

  mode: string;
  id: string
  entity: Schema;

  loading: boolean;
  loadingFailure: any;
  loaded: boolean;

  saving: boolean;
  savingFailure: any;
  saved: boolean;
}

export function sortByName(a: SchemaSummary, b: SchemaSummary): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<SchemaSummary> = createEntityAdapter<SchemaSummary>({
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  filter: '',
  entitiesLoading: false,
  entitiesLoadingFailure: null,

  sortField: null,
  sortAscending: true,
  sortedEntities: [],

  mode: null,
  id: null,
  entity: null,

  loading: false,
  loadingFailure: null,
  loaded: false,

  saving: false,
  savingFailure: null,
  saved: false
});

function sortEntities(state: State): SchemaSummary[] {
  const entities: SchemaSummary[] = (<string[]>state.ids).map(id => state.entities[id]);
  if (state.sortField) {
    return entities.sort(sortByField(state.sortField, state.sortAscending));
  } else {
    return entities;
  }
};

export function reducer(
  state = initialState,
  action: SchemaActions
): State {
  switch (action.type) {

    // Schemas operations
    case SchemaActionTypes.FindSchemas: {
      return {...state, entitiesLoading: true, filter: action.payload.filter};
    }

    case SchemaActionTypes.FindSchemasSuccess: {
      const newState = adapter.addAll(action.payload.schemas, state);
      const sortedEntities = sortEntities(newState);
      return {...newState, entitiesLoading: false, sortedEntities};
    }

    case SchemaActionTypes.FindSchemasFailure: {
      const newState = adapter.removeAll(state);
      const sortedEntities = [];
      return {...newState, entitiesLoadingFailure: action.payload.failure, entitiesLoading: false, sortedEntities};
    }

    case SchemaActionTypes.ToggleSchemaSort: {
      let sortField = state.sortField;
      let sortAscending = state.sortAscending;
      switch (sortField) {
        case action.payload.field: {
          if (sortAscending) {
            sortAscending = false;
          } else {
            sortField = null;
          }
          break;
        }
        default: {
          sortField = action.payload.field;
          sortAscending = true;
          break;
        }
      }
      const newState = {...state, sortField, sortAscending};
      const sortedEntities = sortEntities(newState);
      return {...newState, sortedEntities};
    }

    case SchemaActionTypes.LoadSchema: {
      return {...state, loading: true, loadingFailure: null, loaded: false};
    }

    case SchemaActionTypes.LoadSchemaSuccess: {
      const entity: Schema = { ...action.payload.schema }
      if (action.payload.mode === 'create') {
        entity.id = UUID.UUID()
      }
      return {...state, loading: false, loadingFailure: null, loaded: true, entity};
    }

    case SchemaActionTypes.LoadSchemaFailure: {
      return {...state, loading: false, loadingFailure: action.payload.failure, loaded: false, entity: null };
    }

    case SchemaActionTypes.CreateSchema: {
      return {...state, saving: true, savingFailure: null, saved: false};
    }

    case SchemaActionTypes.CreateSchemaSuccess: {
      const newState = adapter.addOne(action.payload.schema, state);
      const sortedEntities = sortEntities(newState);
      return {...newState, saving: false, savingFailure: null, saved: true, sortedEntities};
    }

    case SchemaActionTypes.CreateSchemaFailure: {
      return {...state, saving: false, savingFailure: action.payload.failure, saved: false};
    }

    case SchemaActionTypes.UpdateSchema: {
      return {...state, saving: true, savingFailure: null, saved: false};
    }

    case SchemaActionTypes.UpdateSchemaSuccess: {
      const newState = adapter.updateOne(
        {
          id: action.payload.schema.id,
          changes: action.payload.schema
        },
        state);
      const sortedEntities = sortEntities(newState);
      return {...newState, saving: false, savingFailure: null, saved: true, sortedEntities};
    }

    case SchemaActionTypes.DeleteSchema: {
      return {...state, saving: true, savingFailure: null};
    }

    case SchemaActionTypes.DeleteSchemaSuccess: {
      const newState = adapter.removeOne(action.payload.id, state);
      const sortedEntities = sortEntities(newState);
      return {...newState, saving: false, savingFailure: null, sortedEntities};
    }
    default: {
      return state;
    }
  }

}

export const selectSchemaState = createFeatureSelector<State>('schema');


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectSchemaState);

export const selectFilter = state => state.schema.filter;
export const selectEntitiesLoadingFailure = state => state.schema.entitiesLoadingFailure;
export const selectSortState = (state) => ({
  sortField: state.schema.sortField,
  sortAscending: state.schema.sortAscending,
  sortedEntities: state.schema.sortedEntities
});

export const selectEntity = state => state.schema.entity;
export const selectLoadingState = (state) => ({
  loading: state.schema.loading,
  loadingFailure: state.schema.failure,
  loaded: state.schema.loaded
});

export const selectSavingState = (state) => ({
  saving: state.schema.saving,
  savingFailure: state.schema.failure,
  saved: state.schema.saved
});

function sortByField(field: string, ascending: boolean) {
  return (aObj: SchemaSummary, bObj: SchemaSummary) => {
    const a = (aObj[field] || '').toLowerCase();
    const b = (bObj[field] || '').toLowerCase();
    if (a < b) {
      return ascending ? -1 : 1;
    } else if (a > b) {
      return ascending ? 1 : -1;
    } else {
      return 0;
    }
  };
}
