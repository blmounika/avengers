import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private commonService: CommonService, private authService: AuthService) {}
  projectDetail= { projId: 1, flat: "507", size: "1295", direction: "WEST", url: "../../assets/images/flat3D.PNG"};
  searchClicked = false;
  user: any;

  ProjectSearchForm = new FormGroup({
    flatNo: new FormControl('', [
      Validators.required]),
    project: new FormControl('', [
      Validators.required]),
  });

  // projects: Project[]=   [
  //   {projId: 1, projName: 'Avatar', builder: 'My House Constructions', address: 'Road No 1, Banjara Hills'}, 
  //   {projId: 2, projName: 'Bvatar1', builder: 'Famous Constructions', address: 'Road No 2, Kukatpally'},
  //   {projId: 3, projName: 'Cvatar', builder: 'My House Constructions', address: 'Road No 1, JNTU'}];
  projects: Project[] =[];
  filteredOptions: Observable<Project[]> | undefined;
  
  savedFlats = [
    { projId: 1, projectName:"Avatar, Road No 1, Banjara Hills",  flatNo: "507", size: "1295 Sq.ft", direction: "West", url: "../../assets/images/flat3D.PNG", flatType: '3BHK'},
    { projId: 2, projectName:"Frozen Hill, Road No 2, Kukkatpally", flatNo: "213", size: "1456 Sq.ft", direction: "East", url: "../../assets/images/flat3D.PNG", flatType: '2BHK'}
  ]


  get formControls() { return this.ProjectSearchForm.controls; }

  ngOnInit() {
    this.getProjects();
    this.user = this.authService.getUser();
    this.filteredOptions = this.formControls['project'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this.filter(name) : this.projects.slice())),
    );
  }

  getProjectName(projId: any) {
    const project = this.projects.filter(proj => proj.projId = projId)[0];
    return project.projName + ", " + project.address;
  }

  getProjects() {
    this.commonService.getData('/projects').subscribe(
      (res: any) => {
      if (res.status === 'Error') {
      } else {
        this.projects = res;
        this.filteredOptions = this.formControls['project'].valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(name => (name ? this.filter(name) : this.projects.slice())),
        );
      }
    },
    (error: any) => {
      console.error(error);
    });
  }

  displayFn(project: Project): string {
    return project && project.projName ? project.projName : '';
  }

  private filter(name: string): Project[] {
    const filterValue = name.toLowerCase();

    return this.projects.filter(option => option.projName.toLowerCase().includes(filterValue));
  }

  searchFlatDeatils() {
    const projectId = this.formControls['project'].value.projId;
    const flatNo = this.formControls['flatNo'].value;
    const url = "projects/" + projectId + "/flat/" + flatNo
    this.commonService.getData(url).subscribe(
      (res: any) => {
      if (res.status === 'Error') {
      } else {
        this.projectDetail = res;
      }
    },
    (error: any) => {
      console.error(error);
    });
    this.searchClicked = true;
  }

  getSavedFlats() {
    if (this.user) {
      this.commonService.getData("user/" + this.user.userId + "/flats").subscribe(
        (res: any) => {
        if (res.status === 'Error') { 
        } else {
          this.savedFlats = res;
        }
      },
      (error: any) => {
        console.error(error);
      });
    }
  }

  addFlat(data: any) {
    const url = "user/" + this.user.userId + "/addFlat";
    const requestBody = { projId: data.projId, flatNo: data.flatNo}
    this.commonService.postData(url, requestBody).subscribe(
      (res: any) => {
      if (res.status === 'Error') {
      } else {
       // this.projectDetail = undefined;
        this.savedFlats = [...this.savedFlats, ...data];
      }
    },
    (error: any) => {
      console.error(error);
    });
    // to be deleted
   // this.projectDetail = undefined;
        this.savedFlats = [...this.savedFlats, ...data];
  }

  deleteFlat(data: any) {
    const url = "user/" + this.user.userId + "/deleteFlat";
    this.savedFlats = this.savedFlats.filter(flat => flat.flatNo != data.flatNo);
    const requestBody = { projId: data.projId, flatNo: data.flatNo}
    this.commonService.postData(url, requestBody).subscribe(
      (res: any) => {
      if (res.status === 'Error') {
      } else {
        this.savedFlats = this.savedFlats.filter(flat => flat.flatNo != data.flatNo);
      }
    },
    (error: any) => {
      console.error(error);
    });
    // to be deleted
    this.savedFlats = this.savedFlats.filter(flat => flat.flatNo != data.flatNo);
  }
}
