import { Component , OnInit} from '@angular/core';
import datainfo from 'src/assets/data.json';
interface Newdata {
  momId: string;
  title: string;
  venue: string;
  meetingDate: string;
  chairPerson: string;
  mode: string;
  keywords: string;

  momAttendeesResponse:{
    attendeesId: string;
    name: string;
    designation:string;
    organization:string;
    email: string;
  }[];

  momActionResponse:{
    momId: string | null;
    actionId: string;
    decissionPoint: string;
    actionPoint: string;
    status: string;
  }[];

  editedBy:string;
  editTime:string;
  remarks:string;
  status:string;
  linkedMOM:string;
  pdfFile:string;
  momEditHistoryResponse:null;

}
@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.css']
})
export class DropdownsComponent implements OnInit{

  ngOnInit() {
    this.filterData();
  }
  
  searchText: string;
  selectedName :string;
  title = 'angular-app';
  OrigData:Newdata[]=datainfo;
  tempData: Newdata[]=datainfo;
  newDataSz: Newdata[]=datainfo;
  pageSize: number = 3;
  curPage: number = 1;
  totalItems: number ;


  filterData(){
    if(!this.selectedName){
      this.newDataSz = this.OrigData;
    }

    else if(this.selectedName===""){
      this.newDataSz = this.OrigData;
    }

    else if(this.selectedName==="-----select field-----"){
      this.newDataSz = this.OrigData;
    }

    else if(this.selectedName==="name"){
      this.tempData = this.OrigData.filter(item =>{
        if(item.momAttendeesResponse && Array.isArray(item.momAttendeesResponse)) {
          let match = item.momAttendeesResponse.filter(newItem => {
            let fieldValue = newItem.name;
            if(fieldValue) {
              return fieldValue.toLowerCase().includes(this.searchText.toLowerCase());
            }
            return false;
          });
          return match.length;
        }

        return false;
      });
    }

    else if(this.selectedName==="decissionPoint"){
      this.tempData = this.OrigData.filter(item =>{
        if(item.momActionResponse && Array.isArray(item.momActionResponse)) {
          let match = item.momActionResponse.filter(newItem => {
            let fieldValue = newItem.decissionPoint;
            if(fieldValue) {
              return fieldValue.toLowerCase().includes(this.searchText.toLowerCase());
            }
            return false;
          });
          return match.length;
        }
        return false;
      });
    }

    else if(this.selectedName==="actionPoint"){
      this.tempData = this.OrigData.filter(item =>{
        if(item.momActionResponse && Array.isArray(item.momActionResponse)) {
          let match = item.momActionResponse.filter(newItem => {
            let fieldValue = newItem.actionPoint;
            if(fieldValue) {
              return fieldValue.toLowerCase().includes(this.searchText.toLowerCase());
            }
            return false;
          });
          return match.length;
        }
        return false;
      });
    }
    
    else{
      this.tempData = this.OrigData.filter(item => {
        let fieldValue = item[this.selectedName];
        if(fieldValue){
          return fieldValue.toString().toLowerCase().includes(this.searchText.toLowerCase());
        }
      });
    }
    this.totalItems = this.tempData.length;
    this.curPage = 1;

    if(this.totalItems>3){
      this.showPage();
    }
    else{
      this.newDataSz = this.tempData;
    }
  }


  resetTable(){
    this.newDataSz = this.OrigData;
    this.tempData = this.OrigData;
    this.selectedName ="";
    this.searchText = '';
    this.totalItems =this.OrigData.length;
    this.pageSize=3;
    this.curPage=1;
    this.showPage();
  }

  showPage(){
    let startIndex = (this.curPage-1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.newDataSz = this.tempData.slice(startIndex , endIndex);
  }

  goToNext(){
    if(this.curPage < this.totalPages){
      this.curPage++;
      this.showPage();
    }
  }

  goToPrev(){
    if(this.curPage > 1){
      this.curPage--;
      this.showPage();
    }
  }

  get totalPages() : number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

}