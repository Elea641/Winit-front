import { Injectable } from '@angular/core';
import { ConvertWinEnum } from '../../models/enum/convertWinEnum';

@Injectable({
  providedIn: 'root',
})
export class HelperProfileService {
  resultatsToNumber(result: ConvertWinEnum): string | number {
    switch (result) {
      case ConvertWinEnum.One:
        return 1;

      case ConvertWinEnum.Two:
        return 2;

      case ConvertWinEnum.Three:
        return 3;

      default:
        throw new Error('ConvertWinEnum not recognized');
    }
  }

  resultatsToString(result: ConvertWinEnum): string {
    switch (result) {
      case ConvertWinEnum.One:
        return 'Premières places';

      case ConvertWinEnum.Two:
        return 'Deuxièmes places';

      case ConvertWinEnum.Three:
        return 'Troisièmes places';

      default:
        throw new Error('ConvertWinEnum not recognized');
    }
  }
}
