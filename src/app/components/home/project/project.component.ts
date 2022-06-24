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
  sideMenuOptions = [{name: 'Packages', route: 'Packages', child: [{name: 'Highly Furnished', route: 'highly'},{name: 'Fully Furnished', route: 'fully'}, {name: 'Semi Furnished', route: 'semi'}]}, 
  {name: 'Customize', route: 'customize'}, {name: 'A La Carte', route: 'alacarte'}];
  flatDetail: any;
  flatDetailSubscriber: any;
  focus = false;
  specifications: any;
  param: any;
  estimations : any = {
    '2bhk': { economy: 1200000, premium: 1500000, semi: 100000},
    '3bhk': { economy: 1800000, premium: 2500000, semi: 150000},
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

  specificationsSemi = {
    images: [],
    boq: [
      { item: 'AC', quantity: 2, brand: 'LG',  model:'M123'},
      { item: 'Refrigerator', quantity: 1, brand: 'LG',  model:'R1223'},
      { item: 'Washing Machine', quantity: 1, brand: 'LG',  model:'W123'},
      { item: 'TV', quantity: 1, brand: 'SONY',  model:'R1223'},
      { item: 'Fan', quantity: 4, brand: 'Samsung',  model:'M123R5'},
      { item: 'Light', quantity: 10, brand: 'Ciska',  model:'CEA12'},
    ],
    totalEstimation: 800000
  };

  changeImage(image: string) {
    this.mainImage = image;
  }
    

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params) {
          this.param = params['package'];
          const flat = localStorage.getItem('flat');
          if (!this.flatDetail && flat) {           
            this.flatDetail = JSON.parse(flat);
          }
          if (this.flatDetail && this.param == 'highly' || this.param == 'fully' || this.param == 'semi') {
            this.selectedProject = this.sideMenuOptions[0].child?.filter(item => item.route == this.param)[0].name;
            this.setData(this.flatDetail);
          }
      }
      console.log(params);
    });
    setTimeout(() => {
      this.flatDetailSubscriber = this.commonService.flatDetail.subscribe(data =>  {
        console.log(data);
        const detail = data;
        this.flatDetail = JSON.parse(detail);
        if (this.param == 'highly' || this.param == 'fully' || this.param == 'semi') {
          this.setData(data);
        }
        // remove
        // this.mainImage = this.specificationsPremium.images[0];
        // this.specifications = this.specificationsPremium;

        this.flatDetail['type'] = this.param;
        this.getPackages(this.flatDetail);
      });
    }, 0)
    
  }


  setData(data?: any) {
    this.specifications = this.param == 'highly' ? this.specificationsPremium : this.param == 'fully' ? this.specificationsEconomy : this.specificationsSemi;
    this.specifications.images = data.type.toLowerCase() == '2bhk' ? this.images2bhk: this.images3bhk;
    const image = this.param == 'highly' ? 'premium' : this.param == 'fully' ? 'economy' : 'semi'
    this.specifications.images[0] = '../../../../assets/images/package-' + image + '-' + data.type.toLowerCase() + '.PNG';
    if (this.param == 'highly') {
      this.specifications.totalEstimation = this.estimations[data.type.toLowerCase()].premium;
    } else if (this.param == 'fully') {
      this.specifications.totalEstimation = this.estimations[data.type.toLowerCase()].economy;
    } else {
      this.specifications.totalEstimation = this.estimations[data.type.toLowerCase()].semi;
    }
    this.mainImage = this.param == 'highly' ? this.specifications.images[0] : this.param == 'fully' ? this.specificationsEconomy.images[0] : this.specificationsSemi.images[0];
  }

  ngOnDestroy() {
    //this.flatDetailSubscriber.destroy(); 
  }

  getPackages(data: any) {
    const url = "getQuote/" + data.type + "/packages?type=" + data.package;
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
    const name = project.route.toLowerCase();
    if (name == 'packages') {
      return;
    }
    this.selectedProject = project.name;
    this.router.navigate(['project', name]);
    if (name == 'highly' || name == 'fully' || name == 'semi') {
      this.getPackages({package: name});
      this.setData(this.flatDetail);
    }
  }

  goBack() {
    this.router.navigate(['home']);
  }

}
