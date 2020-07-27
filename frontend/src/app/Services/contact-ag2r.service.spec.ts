/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing'

import { Contact_AG2RService } from './contact-ag2r.service'

describe('Contact_AG2RService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Contact_AG2RService]
    })
  })

  it('should be created', inject([Contact_AG2RService], (service: Contact_AG2RService) => {
    expect(service).toBeTruthy()
  }))

  it('should get all feedback directly from the rest api' ,inject([Contact_AG2RService,HttpTestingController],
    fakeAsync((service: Contact_AG2RService, httpMock: HttpTestingController) => {
      let res: any
      service.find(null).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/contact-ag2r/')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('GET')
      expect(req.request.params.toString()).toBeFalsy()
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should delete feedback directly via the rest api' ,inject([Contact_AG2RService,HttpTestingController],
    fakeAsync((service: Contact_AG2RService, httpMock: HttpTestingController) => {
      let res: any
      service.del(1).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/contact-ag2r/1')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('DELETE')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should create feedback directly via the rest api' ,inject([Contact_AG2RService,HttpTestingController],
    fakeAsync((service: Contact_AG2RService, httpMock: HttpTestingController) => {
      let res: any
      service.save(null).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/contact-ag2r/')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toBeNull()
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))
})
