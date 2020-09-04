/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing'

import { SqliService } from './sqli.service'

describe('SqliService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SqliService]
    })
  })

  it('should be created', inject([SqliService], (service: SqliService) => {
    expect(service).toBeTruthy()
  }))
})
