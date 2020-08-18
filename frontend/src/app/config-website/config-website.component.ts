/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ConfigurationService } from '../Services/configuration.service'
import { ConfigWebsiteService } from '../Services/config-website.service'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { FormControl, Validators } from '@angular/forms'
import { FormSubmitService } from '../Services/form-submit.service'
import { CookieService } from 'ngx-cookie-service'
import { ActivatedRoute } from "@angular/router";

dom.watch()

@Component({
  selector: 'config-website-as',
  templateUrl: './config-website.component.html',
  styleUrls: ['./config-website.component.scss']
})
export class ConfigWebsiteComponent implements OnInit {

  public configwebsiteControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public colorControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public messageControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(160)])
  public confirmation: any
  public error: any
  public config: any
  public colorValue: any

  constructor (private route: ActivatedRoute, private configurationService: ConfigurationService, private cookieService: CookieService, private ConfigWebsiteService: ConfigWebsiteService, private sanitizer: DomSanitizer, private formSubmitService: FormSubmitService) {}

  ngOnInit () {
    this.cookieService.set('kikou-cookie', "hey")
    this.config = {}
    this.formSubmitService.attachEnterKeyHandler('config-website-form', 'submitButton', () => this.save())
    
    this.route.queryParamMap.subscribe(queryParams => {
      this.colorValue = queryParams.get("color")
    })

    this.ConfigWebsiteService.find().subscribe((result) => {
      console.log(result)
    }, (err) => {
      console.log("mes erreurs" + err)
      this.config = {}
    })
  }

  save () {
    this.config.color = `${this.colorControl.value}`
  
    this.ConfigWebsiteService.save(this.config).subscribe((savedconfig) => {
      this.confirmation = savedconfig.reponse
      this.config = {}
      this.ngOnInit()
      this.resetForm()
    }, (err) => {
      console.log("mes erreurs" + err)
      this.config = {}
    })
  }

  resetForm () {
    this.configwebsiteControl.markAsUntouched()
    this.configwebsiteControl.markAsPristine()
    this.configwebsiteControl.setValue('')
  }

  muhaha (coco) {
    alert('votre couleur est: '+ coco)
  }
}
