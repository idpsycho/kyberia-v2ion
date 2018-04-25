import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';

import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	login
	password
  errors

  constructor(
  	public navCtrl: NavController,
  	public api: ApiService,
  ) {

    var lsLogin = (window.localStorage && window.localStorage['v2ion_login'])
    this.login = lsLogin || ''
  }

  btnLogin() {


		// this.navCtrl.setRoot(ListPage)

    if (window.localStorage)
      window.localStorage['v2ion_login'] = this.login

    this.errors = ''
    this.api.login(this.login, this.password).subscribe(resp => {

      if (resp == 'error') {
        this.errors = resp
        return
      }

      console.log('home login response', resp)
      this.navCtrl.setRoot(ListPage)

    })

  }
}
