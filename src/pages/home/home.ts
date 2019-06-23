import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import moment from 'moment';

import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public content: string;

  constructor(public navCtrl: NavController, public file: File, 
    public toastController: ToastController, public androidPermissions: AndroidPermissions) { }

  askPermission() {
    const permission = this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE;
    
    this.androidPermissions.checkPermission(permission).then(
      result => {
        if(result.hasPermission)
          console.log('Has permission');
        else
          this.androidPermissions.requestPermission(permission);
      },
      err => this.androidPermissions.requestPermission(permission)
    );
  }

  read = async () => {
    let path = this.file.externalRootDirectory + 'Download/';
    // let times = [];
    
    for(let n = 0; n < 30; n++) {
      // let beginTimer = moment().valueOf();
      let fileName = "file"+ n + ".txt";
      await this.file.readAsText(path, fileName);
      // let endTimer = moment().valueOf();
      // times.push(endTimer - beginTimer);
    }
    // await this.file.writeFile(path, "aaTimeReadIonic.csv", "TIMES\n" + times.join("\n"), {replace: true});
    this.content = 'Finished';
  }
}
