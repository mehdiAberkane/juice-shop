/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ConfigurationService } from '../Services/configuration.service'
import { GuestBookService } from '../Services/guestbook.service'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { FormControl, Validators } from '@angular/forms'
import { FormSubmitService } from '../Services/form-submit.service'

dom.watch()

@Component({
  selector: 'guestbook-as',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.scss']
})
export class GuestBookComponent implements OnInit {

  public guestbookControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public authorControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public messageControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public feedback: any = undefined
  public confirmation: any
  public error: any

  constructor (private configurationService: ConfigurationService, private GuestBookService: GuestBookService, private sanitizer: DomSanitizer, private formSubmitService: FormSubmitService) {}

  ngOnInit () {
    this.feedback = {}
    this.formSubmitService.attachEnterKeyHandler('guestbook-form', 'submitButton', () => this.save())
  }

  save () {
    this.feedback.comment = `${this.guestbookControl.value}`
    this.feedback.author = `${this.authorControl.value}`
    
    this.GuestBookService.save(this.feedback).subscribe((savedFeedback) => {
      this.confirmation = savedFeedback.reponse
      this.feedback = {}
      this.ngOnInit()
      this.resetForm()
    }, (err) => {
      console.log("mes erreurs" + err)
      this.feedback = {}
    })
  }

  resetForm () {
    this.guestbookControl.markAsUntouched()
    this.guestbookControl.markAsPristine()
    this.guestbookControl.setValue('')
  }
}
