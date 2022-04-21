import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CommodityService } from 'src/app/commodity/commodity.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { UserChange } from 'src/app/shared/interfaces/user-interfaces/user-change';
import { UserChangesResolved } from 'src/app/shared/interfaces/user-interfaces/user-changes-resolverd';
import { UserService } from '../user.service';


@Component({
  selector: 'app-alter-change',
  templateUrl: './alter-change.component.html',
  styleUrls: ['./alter-change.component.css']
})
export class AlterChangeComponent implements OnInit {

 
  changeHistory: UserChange[] =[];
  currentUser!:AuthResponseDto|null;
  mostRecent!: UserChange;
  cId!:number | null;
  change!:UserChange |null;
  editForm!:FormGroup;
  

  constructor(private _authService:AuthService, private _userService:UserService, private route:ActivatedRoute,private _router:Router,
    private formBuilder:FormBuilder, private _commodityService: CommodityService) { 
    }
    
  ngOnInit(): void {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

 
    this.route.paramMap.subscribe( param=>{this.cId = +param.get('cid')!})
    
    if(!this.cId){
   this._userService.getChangeById(this.cId!)
                      .subscribe(resp=> {this.change = resp;
                                        this.setValues(this.change)})
    }
    else{  this._userService.getChangeById(this.cId!)
    }
   
   this.editForm=this.formBuilder.group({
    transNumber:['', [Validators.required]],
    timeStamp:['', [Validators.required]],
    editTotal:['', [Validators.required]],
    netChange:['', [Validators.required]],
    commodityId:['', [Validators.required]]})

      }

      private setValues(change: UserChange){
       
    
        this.editForm.get('transNumber')?.setValue(change?.changeId)
        this.editForm.get('timeStamp')?.setValue(change?.changeTime)
        this.editForm.get('editTotal')?.setValue(change?.totalAmount)
        this.editForm.get('netChange')?.setValue(change?.changeAmount)
        this.editForm.get('commodityId')?.setValue(change?.commodityId)
       

        // setValue({transNumber:change?.changeId,
        //                           timeStamp: change?.changeTime,
        //                           editTotal: change?.totalAmount,
        //                           netChange: change?.changeAmount,
        //                           commodityId: change?.commodityId,})
        //                           console.log(change)
      }

      submitUpdate(editFormValues:any){

      }

      
}
