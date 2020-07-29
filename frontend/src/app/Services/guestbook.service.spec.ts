/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing'

import { GuestBookService } from './guestbook.service'

describe('GuestBookService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GuestBookService]
    })
  })

  it('should be created', inject([GuestBookService], (service: GuestBookService) => {
    expect(service).toBeTruthy()
  }))

  it('should get all feedback directly from the rest api' ,inject([GuestBookService,HttpTestingController],
    fakeAsync((service: GuestBookService, httpMock: HttpTestingController) => {
      let res: any
      service.find(null).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/guestbook/')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('GET')
      expect(req.request.params.toString()).toBeFalsy()
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should delete feedback directly via the rest api' ,inject([GuestBookService,HttpTestingController],
    fakeAsync((service: GuestBookService, httpMock: HttpTestingController) => {
      let res: any
      service.del(1).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/guestbook/1')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('DELETE')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should create feedback directly via the rest api' ,inject([GuestBookService,HttpTestingController],
    fakeAsync((service: GuestBookService, httpMock: HttpTestingController) => {
      let res: any
      service.save(null).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/guestbook/')
      req.flush({ data: 'apiResponse' })

      tick()
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toBeNull()
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))
})
