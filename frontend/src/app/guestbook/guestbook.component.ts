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
import { CookieService } from 'ngx-cookie-service'
import { SqliService } from '../Services/sqli.service'

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
  public guestbooks: any
  public guestbook_content: any

  constructor (private configurationService: ConfigurationService, private SqliService: SqliService, private cookieService: CookieService, private GuestBookService: GuestBookService, private sanitizer: DomSanitizer, private formSubmitService: FormSubmitService) {}

  ngOnInit () {
    this.SqliService.getProduct('guestbook').subscribe((log) => {
      console.log(log)
    })

    this.guestbook_content = "salut cava ?"
    this.cookieService.set('kikou-cookie', "hey")
    this.feedback = {}
    this.formSubmitService.attachEnterKeyHandler('guestbook-form', 'submitButton', () => this.save())
  }

  save () {
    this.feedback.comment = `${this.guestbookControl.value}`
    this.feedback.author = `${this.authorControl.value}`
  
    this.GuestBookService.save('<xml><root><comment>'+this.feedback.comment+'</comment><author>'+this.feedback.author+'</author></root></xml>').subscribe((savedFeedback) => {
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

  getGuestBook () {
    this.GuestBookService.find().subscribe((feedbacks) => {
      console.log(feedbacks.reponse)
      for (let i = 0; i < feedbacks.length; i++) {
        console.log(feedbacks[i].comment)
        this.guestbook_content = 'bien bien'
      }
    },(err) => {
      console.log(err)
    })
  }
}
