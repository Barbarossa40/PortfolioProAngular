import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CommodityService } from 'src/app/commodity/commodity.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { UserChange } from 'src/app/shared/interfaces/user-interfaces/user-change';
import { UserChangesResolved } from 'src/app/shared/interfaces/user-interfaces/user-changes-resolverd';
import { textChangeRangeIsUnchanged } from 'typescript';
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
  errorMessage!: string|null;
  

  constructor(private _authService:AuthService, private _userService:UserService, private route:ActivatedRoute,private _router:Router,
    private formBuilder:FormBuilder, private _commodityService: CommodityService) { 
    }
    
  ngOnInit(): void {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

 
    this.route.paramMap.subscribe( param=>{this.cId = +param.get('cid')!})
    
    
   this._userService.getChangeById(this.cId!)
                      .subscribe(resp=> {this.change = resp;
                                        this.setValues(this.change)})
                      

 
   this.editForm=this.formBuilder.group({
    transNumber:['', [Validators.required]],
    timeStamp:[Date, [Validators.required]],
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
      }

      submitUpdate(editFormValues:any){
        const edit = {... editFormValues };
        const editChange: UserChange = {
          changeId: edit.transNumber,
          changeTime: edit.timeStamp,
          changeAmount: edit.netChange,
          totalAmount: edit.editTotal,
          commodityId: edit.commodityId,
          commodity: null,
          userId!: this.currentUser?.id!}

          this._userService.putChange(editChange).subscribe({next:resp => this.editForm.reset(),
            error:() => this.errorMessage=" unknown error",
            complete:()=>  window.location.reload()})
          
      }

      
}
