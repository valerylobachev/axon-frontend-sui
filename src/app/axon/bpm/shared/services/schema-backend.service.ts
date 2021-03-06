import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Schema, SchemaSummary} from 'app/axon/bpm/shared/services/schema.model'
import {Observable} from 'rxjs'

const SERVICE_BASE = '/web-api/bpm/config'
@Injectable({
  providedIn: 'root'
})
export class SchemaBackendService {



  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<SchemaSummary[]> {
    return this.find('')
  }

  find(filter: string) {
    return this.httpClient.post<SchemaSummary[]>(`${SERVICE_BASE}/schemas`, { filter: filter })
  }

  create(schema: Schema) {
    return this.httpClient.post<Schema>(`${SERVICE_BASE}/schema`, schema )
  }

  update(schema: Schema) {
    return this.httpClient.put<Schema>(`${SERVICE_BASE}/schema`, schema )
  }

  delete(id: string) {
    return this.httpClient.delete(`${SERVICE_BASE}/schema/${id}`)

  }

  findById(id: string) {
    return this.httpClient.get<Schema>(`${SERVICE_BASE}/schema/${id}`)
  }
}
