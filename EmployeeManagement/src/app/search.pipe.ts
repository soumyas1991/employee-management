import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log(value)
    if(!value)return null;
    if(!args)return value;

    var date = (new Date()).toISOString().split('T')[0];
    var currentDate = args+'T00:00:00.000Z';
    var obj:any;
    args = args.toLowerCase();

    var result = value.filter((obj: any) => obj.joindate == currentDate && obj.enddate == null)
    return result;
   ;
}

}
