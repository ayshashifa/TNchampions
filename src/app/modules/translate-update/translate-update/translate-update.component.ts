import { Component } from '@angular/core';
declare const require: any;
const english = require('../../../../assets/i18n/english.json');
const tamil = require(`../../../../assets/i18n/tamil.json`);

@Component({
  selector: 'app-translate-update',
  templateUrl: './translate-update.component.html',
  styleUrls: ['./translate-update.component.scss']
})
export class TranslateUpdateComponent {

  englishData: any = [];
  tamilData: any = [];
  tamilLangData: any = [];
  englishLangData: any = [];
  updatedLanguage: any = null;

  constructor() {
    this.addNewKeyAndRemoveOldKey();
    this.updatedLanguage = tamil.translations;
    Object.entries(tamil.translations).forEach((data: any) => {
      let langDta = {
        id: data[0],
        text: data[1],
        newKey: false
      }
      if (data[1] == 'NewKeyNeedToUpdate') {
        tamil.translations[data[0]] = ''
        langDta = {
          id: data[0],
          text: '',
          newKey: true
        }
      }
      this.tamilLangData.push(langDta);
    });
    this.englishLangData = english.translations
  }

  addNewKeyAndRemoveOldKey() {
    //Add New Key in tamil json
    Object.entries(english.translations).forEach((data: any) => {
      if (!tamil.translations.hasOwnProperty(data[0])) {
        tamil.translations[data[0]] = 'NewKeyNeedToUpdate';
      }
    });

    //remove OldKey in tamil json
    Object.entries(tamil.translations).forEach((data: any) => {
      if (!english.translations.hasOwnProperty(data[0])) {
        delete tamil.translations[data[0]]
      }
    });
  }

  updateTamilLanguage(id: string, data: any) {
    this.updatedLanguage[id] = data;
  }

  downloadJsonFile() {
    const object = { "locale": "ta", "translations": this.updatedLanguage }
    const jsonString = JSON.stringify(object);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tamil.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

}
