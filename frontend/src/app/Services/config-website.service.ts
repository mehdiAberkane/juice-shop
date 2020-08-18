/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConfigWebsiteService {

  private hostServer = environment.hostServer
  private host = this.hostServer + '/api/config-website'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/xml', //<- To SEND XML
      'Accept':  'application/xml',       //<- To ask for XML
      'Response-Type': 'text'             //<- b/c Angular understands text
    })
  };

  constructor (private http: HttpClient) { }

  find (params?: any) {
    return this.http.get(this.host + '/' , {
      params: params
    }).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }

  save (params: any) {
    return this.http.post(this.host + '/', params, this.httpOptions).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }
}
