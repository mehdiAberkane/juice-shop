/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class SqliService {

  private hostServer = environment.hostServer
  private host = this.hostServer + '/api/'

  constructor (private http: HttpClient) { }

  getProduct(uri, product = 'apple') {
    return this.http.post(this.host + uri, {name: product}).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }
}
