import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(array: Array<any>, price: any, asc: any): any {
    if (array != undefined){
      if(asc){
        console.log('piiiiiipeee asscccccc')
        array.sort((a: any, b: any) => {

          return a[price]-b[price]
        });
      }
      else{
        console.log('piiiiiipeee ddddddddddddddddd')
        //sort desc
        array.sort((a: any, b: any) => {

          return b[price]-a[price];
        });


      }

    }

    return array;
  }

}
