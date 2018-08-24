import {Injectable} from '@angular/core'
import { Observable } from 'rxjs'
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService{

  private geoCoder ;
  private locationAdressCach : any = {};

  constructor(private camelizePipe : CamelizePipe){

  }


  private camelize(value:string): string {
    return this.camelizePipe.transform(value);
  }
  private cachLocation(location: string , coord : any){
    this.locationAdressCach[this.camelize(location)] = coord ;
  }

  private isLocationCached(location : string):boolean {
    return this.locationAdressCach[this.camelize(location)];
  }

  private codeLocation(location: string):Observable<any>{
    if(!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }
    return new Observable( (observable) => {
        this.geoCoder.geocode({address: location}, (result, status) => {
          if(status === 'OK'){
            console.log("OK");
            const geometry = result[0].geometry.location;
            console.log(result);
            const coordXY = {lat: geometry.lat(), lng: geometry.lng()} ;
            this.cachLocation(location, coordXY);
            observable.next({lat: geometry.lat(), lng: geometry.lng()});
          }else{
            observable.error("Error Location could not be geocoded");
          }
        });
    });
  }

  public geocodeLocation(location : string): Observable<any>{
        if(this.isLocationCached(location)){
            console.log("Cache OK");
            return Observable.of(this.locationAdressCach[this.camelize(location)]);
        }else {
            return this.codeLocation(location);
        }
  }

}
