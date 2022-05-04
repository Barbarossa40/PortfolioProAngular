import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AssetService } from 'src/app/asset/asset.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { UserTransaction } from 'src/app/shared/interfaces/user-interfaces/user-transaction';
import { UserTransactionsResolved } from 'src/app/shared/interfaces/user-interfaces/user-transactions-resolved';
import { UserService } from '../user.service';


@Component({
  selector: 'app-alter-transaction',
  templateUrl: './alter-transaction.component.html',
  styleUrls: ['./alter-transaction.component.css']
})
export class AlterTransactionComponent implements OnInit {

 
  transactionHistory: UserTransaction[] =[];
  currentUser!:AuthResponseDto|null;
  mostRecent!: UserTransaction;
  tId!:number | null;
  transaction!:UserTransaction |null;
  editForm!:FormGroup;
  errorMessage!: string|null;
  

  constructor(private _authService:AuthService, private _userService:UserService, private route:ActivatedRoute,private _router:Router,
    private formBuilder:FormBuilder, private _assetService: AssetService) { 
    }
    
  ngOnInit(): void {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

 
    this.route.paramMap.subscribe( param=>{this.tId = +param.get('tid')!})
    
    
   this._userService.getTransactionById(this.tId!)
                      .subscribe(resp=> {this.transaction = resp;
                                        this.setValues(this.transaction)})
                      

 
   this.editForm=this.formBuilder.group({
    transNumber:['', [Validators.required]],
    timeStamp:[Date, [Validators.required]],
    editTotal:['', [Validators.required]],
    netTransaction:['', [Validators.required]],
    assetId:['', [Validators.required]]})

      }

      private setValues(transaction: UserTransaction){
      
       
        this.editForm.get('transNumber')?.setValue(transaction?.transactionId)
        this.editForm.get('timeStamp')?.setValue(transaction?.transactionTime)
        this.editForm.get('editTotal')?.setValue(transaction?.totalAmount)
        this.editForm.get('netTransaction')?.setValue(transaction?.transactionAmount)
        this.editForm.get('assetId')?.setValue(transaction?.assetId)
      }

      submitUpdate(editFormValues:any){
        const edit = {... editFormValues };
        const editTransaction: UserTransaction = {
          transactionId: edit.transNumber,
          transactionTime: edit.timeStamp,
          transactionAmount: edit.netTransaction,
          totalAmount: edit.editTotal,
          assetId: edit.assetId,
          asset: null,
          userId!: this.currentUser?.id!,
          priceSnapshot:edit.priceSnapshot}

          this._userService.putTransaction(editTransaction).subscribe({next:resp => this.editForm.reset(),
            error:() => this.errorMessage=" unknown error",
            complete:()=>  window.location.reload()})
          
      }

      
}
