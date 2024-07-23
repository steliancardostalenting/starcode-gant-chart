import { Injectable } from '@angular/core';
import config from 'devextreme/core/config';

@Injectable({
  providedIn: 'root',
})
export class RegisterDevextremeService {
  public licenseKey: string = '';

  constructor() {}

  public registerLicense() {
    const licenseKey = this.licenseKey;
    config({ licenseKey });
  }
}
