import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-saved-flats',
  templateUrl: './saved-flats.component.html',
  styleUrls: ['./saved-flats.component.scss']
})
export class SavedFlatsComponent implements OnInit {
  @Input() savedFlat: {projId: number, projectName: string, flat: string, size: string, direction: string, url: string, type: string} = {
    projId: 0,
    projectName: '',
    flat: '',
    size: '',
    direction: '',
    url: '',
    type: ''
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

  onViewPackages(packages: String) {
    this.commonService.viewFlat(JSON.stringify(this.savedFlat));
    this.router.navigate(['project', packages]); //{queryParams: option});
  }

}
