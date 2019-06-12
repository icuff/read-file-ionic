import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import moment from 'moment';

import { File } from '@ionic-native/file';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public content: string;

  constructor(public navCtrl: NavController, public file: File, 
    public toastController: ToastController) { }

  read() {
    var that = this;
    let beginTimer = moment().valueOf();
    window.resolveLocalFileSystemURL(this.file.externalRootDirectory + 'Download/', function (dirEntry) {
      that.getFile(dirEntry, "testIonic.txt", beginTimer);
    }, function(){ 
      console.log('Ocorreu um erro') ;
    });
  }

  getFile(dirEntry, fileName, beginTimer) {
    var that = this;

    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
      that.readFile(fileEntry, beginTimer);
    }, function() {
      console.log('onErrorCreateFile');
    });
}

  readFile(fileEntry, beginTimer) {
    var that = this;

    fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onloadend = function() {
          console.log("Successful file read: " + this.result);
          that.content = this.result.toString();
      };

      reader.readAsText(file);
    }, function() {
      console.log('Erro de leitura do arquivo');
    });
    let endTimer = moment().valueOf();
      const toast = this.toastController.create({
        message: 'Finished in ' + (endTimer - beginTimer) + 'ms',
        duration: 200000
      });
      toast.present();
  }
}
