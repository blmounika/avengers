import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  mainImage: string | undefined;
  selectedProject: string | undefined;

  constructor(private commonService: CommonService, private route: ActivatedRoute, private router: Router) { }
  displayPackages = true;
  sideMenuOptions = [{name: 'Packages', child: [{name: 'Premium'},{name: 'Economy'}]}, 
  {name: 'Customise'}, {name: 'A La Carte'}];
  flatDetail: any;
  flatDetailSubscriber: any;
  focus = false;
  specifications: any;
  estimations : any = {
    '2bhk': { economy: 1200000, premium: 1500000},
    '3bhk': { economy: 1800000, premium: 2500000}
  }
  images2bhk = [
    '../../../../assets/images/package-2bhk.PNG', 
  '../../../../assets/images/bedroom1.PNG',
   '../../../../assets/images/bedroom2.PNG',
   '../../../../assets/images/kitchen.PNG',
  '../../../../assets/images/living-room.PNG'];
  images3bhk = [
    '../../../../assets/images/package-3bhk.PNG', 
  '../../../../assets/images/bedroom1.PNG',
   '../../../../assets/images/bedroom2.PNG',
   '../../../../assets/images/bedroom3.PNG',
   '../../../../assets/images/kitchen.PNG',
  '../../../../assets/images/living-room.PNG'];

  specificationsPremium = {
    images: [],
    boq: [
      { item: 'AC', quantity: 3, brand: 'Lloyd',  model:'M345'},
      { item: 'Refrigerator', quantity: 1, brand: 'Samsung',  model:'R2234'},
      { item: 'Washing Machine', quantity: 1, brand: 'Samsung',  model:'WR5123'},
      { item: 'TV', quantity: 1, brand: 'Samsung',  model:'R1223'},
      { item: 'Fan', quantity: 5, brand: 'Samsung',  model:'M123R5'},
      { item: 'Light', quantity: 12, brand: 'Ciska',  model:'CEA12'},
      { item: 'Chimney', quantity: 1, brand: 'Samsung',  model:'CA145'},
      { item: 'Beds', quantity: 3, brand: 'Ciska',  model:'CEA12'},
    ],
    totalEstimation: 2000000
  };

  specificationsEconomy = {
    images: [],
    boq: [
      { item: 'AC', quantity: 4, brand: 'LG',  model:'M123'},
      { item: 'Refrigerator', quantity: 1, brand: 'LG',  model:'R1223'},
      { item: 'Washing Machine', quantity: 1, brand: 'LG',  model:'W123'},
      { item: 'TV', quantity: 1, brand: 'SONY',  model:'R1223'},
      { item: 'Fan', quantity: 6, brand: 'Samsung',  model:'M123R5'},
      { item: 'Light', quantity: 15, brand: 'Ciska',  model:'CEA12'},
    ],
    totalEstimation: 1200000
  };

  changeImage(image: string) {
    this.mainImage = image;
  }
    

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params) {
          this.selectedProject = params['package'];
          if (this.flatDetail && this.selectedProject == 'premium' || this.selectedProject == 'economy') {
            this.setData(this.flatDetail);
          }
      }
      console.log(params);
    });
    setTimeout(() => {
      this.flatDetailSubscriber = this.commonService.flatDetail.subscribe(data =>  {
        console.log(data);
        this.flatDetail = data;
        if (this.selectedProject == 'premium' || this.selectedProject == 'economy') {
          this.setData(data);
        }
        // remove
        // this.mainImage = this.specificationsPremium.images[0];
        // this.specifications = this.specificationsPremium;

        this.flatDetail['type'] = this.selectedProject;
        this.getPackages(this.flatDetail);
      });
    }, 10)
    
  }

  setData(data?: any) {
    this.specifications = this.selectedProject == 'premium' ? this.specificationsPremium : this.specificationsEconomy;
    this.specifications.images = data.flatType.toLowerCase() == '2bhk' ? this.images2bhk: this.images3bhk;
    this.specifications.images[0] = '../../../../assets/images/package-' + this.selectedProject + '-' + data.flatType.toLowerCase() + '.PNG';
    if (this.selectedProject == 'premium') {
      this.specifications.totalEstimation = this.estimations[data.flatType.toLowerCase()].premium;
    } else {
      this.specifications.totalEstimation = this.estimations[data.flatType.toLowerCase()].economy;
    }
    this.mainImage = this.specificationsPremium.images[0];
  }

  ngOnDestroy() {
    //this.flatDetailSubscriber.destroy(); 
  }

  getPackages(data: any) {
    const url = "getQuote/" + data.flatType + "/packages?type=" + data.type;
    this.commonService.getData(url).subscribe(
      (res: any) => {
      if (res.status === 'Error') {
      } else {
        this.specifications = res;
        this.mainImage = res.images[0];
      }
    },
    (error: any) => {
      console.error(error);
    });
  }

  onPackageChange(project: any) {
    const name = project.name.toLowerCase();
    if (name == 'packages') {
      return;
    }
    this.router.navigate(['project', name]);
    if (name == 'premium' || name == 'economy') {
      this.getPackages({type: name});
    }
  }

  goBack() {
    this.router.navigate(['home']);
  }

}
