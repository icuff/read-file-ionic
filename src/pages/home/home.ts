import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public content: string;

  constructor(public navCtrl: NavController, public file: File) { }

  read() {
    var that = this;

    window.resolveLocalFileSystemURL(this.file.externalRootDirectory, function (dirEntry) {
      that.getFile(dirEntry, "fileToAppend.txt");
    }, function(){ 
      console.log('Ocorreu um erro') ;
    });
  }

  getFile(dirEntry, fileName) {
    var that = this;

    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
      that.readFile(fileEntry);
    }, function() {
      console.log('onErrorCreateFile');
    });
}

  readFile(fileEntry) {
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
  }
}
