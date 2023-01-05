import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../Home-Interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {



 

  products: IProduct[]=[];
  constructor(private http: HttpClient) 
  {
   
  }

  //Getting the Products from backend API
  getProducts():Observable<IProduct[]>{
    let tempVar = this.http.get<IProduct[]>('https://qkrtbckend-namrathaappservice.azurewebsites.net/api/home/getproducts')
    console.log(tempVar)
    return tempVar
  }

  MakePayment(CardNumber1:string,cvv1:string,ex:string,pid:number,cost:number):Observable<boolean>{

    var pay:Payment
    pay={cardNumber:CardNumber1,CVV:cvv1,Expiry:ex,ProdCost:cost,ProdID:pid}
    console.log(pay)

    let tempVar = this.http.post<boolean>('http://localhost:7142/api/Function1',pay)
    return tempVar
  }

  PostNewSubscriber(emailID:string):Observable<boolean>{
  
    console.log(emailID)

    let tempVar = this.http.get<boolean>('https://qkrtbckend-namrathaappservice.azurewebsites.net/api/customer/AddNewSubscriber?emailID='+emailID)
    console.log(tempVar)
    return tempVar
  }

  
  ValidateUser(userEmailID:string, userPassword:string, type:string):Observable<number>
  {
    var user:User
    user={emailID:userEmailID, password:userPassword,usertype:type};
    console.log(user)

    let result=this.http.post<number>('https://qkrtloginnamrathaazfunc.azurewebsites.net/api/Function1?code=Fl0EYjCZSAoIbA5TUUnq9-AoyVzJOkuyvwASk5JpMhKiAzFuNfFq2Q==',user)
    return result

  }

  public uploadImage(image: File): Observable<Response>{
    const formData = new FormData();
   
    formData.append('image', image);
    console.log(formData)
    let result=this.http.post<Response>('https://quickkart-backend.azurewebsites.net/api/admin/upload',formData).pipe(catchError(this.errorHandler))
    console.log(result)
    return result
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message|| "server error")
  }
}

export class User{

  emailID:string='';
  password:string='';
  usertype:string='';


}

export class Payment{

  cardNumber:string='';
  CVV:string='';
  Expiry:string='';
  ProdCost:number=0;
  ProdID:number=0;

}
