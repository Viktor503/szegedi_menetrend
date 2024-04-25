import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: Timestamp, ...args: unknown[]): string {
    const date = value.toDate();
    const ISOtime = date.toISOString
    var h;
    if(date.getHours() == 0){
      h = '23'
    }else{
      h = ((date.getHours()-1)<10)? '0'+(date.getHours()-1):date.getHours()-1;
    }
    
    const m = (date.getMinutes()<10)? '0'+date.getMinutes():date.getMinutes();
    const res = h+":"+m;
    return res;
  }

}
