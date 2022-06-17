import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-saved-flats',
  templateUrl: './saved-flats.component.html',
  styleUrls: ['./saved-flats.component.scss']
})
export class SavedFlatsComponent implements OnInit {
  @Input() savedFlat: {projId: number, projectName: string, flatNo: string, size: string, direction: string, url: string, flatType: string} = {
    projId: 0,
    projectName: '',
    flatNo: '',
    size: '',
    direction: '',
    url: '',
    flatType: ''
  };
  packages = ['Economy', 'Premium'];
  alacarte = ['Electronics', 'Electrical', 'Mechanical', 'Plumbing', 'Furnishing', 'Interiors', 'Furniture'];
  @Output() flatDeleted = new EventEmitter(); 

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  deleteFlat(flatDetail: any) {
    this.flatDeleted.emit(flatDetail);
    console.log( "flat deleted:" + flatDetail)
  }

  onViewPackages() {
    this.commonService.viewFlat(this.savedFlat);
    this.router.navigate(['project', 'premium']); //{queryParams: option});
  }

}
