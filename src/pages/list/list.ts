import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  posts :any = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    api: ApiService,
  ) {

    api.getTop().subscribe(resp => {

      if (!resp) {
        navCtrl.setRoot(HomePage)
        return;
      }

      if ('length' in resp)
        this.posts = resp
    })
  }

}
