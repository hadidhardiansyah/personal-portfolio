import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {fade, fadeInView, staggerFade} from 'src/app/animations/animations';
import {ProjectCardComponent} from '../project-card/project-card.component';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
  animations: [
    fadeInView
  ]
})
export class ProjectsSectionComponent implements OnInit {

  @ViewChildren(ProjectCardComponent, {read: ElementRef}) projs: QueryList<ElementRef>
  inViewList: Array<boolean> = [];

  projects: Array<any> = [
    {
      projectImg: 'cryptoApp.png',
      projectName: 'Crypto Tracker',
      projectDescription: 'The cryptocurrency data that is used in this app comes from a free API from CoinGecko! Prices may be slightly delayed',
      isProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/Crypto-Tracker',
    },
    {
      projectImg: 'mapsApp.png',
      projectName: 'Maps',
      projectDescription: 'IOS mobile application that shows the coordinates of a place',
      isProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/Map-IOS16.2',
    },
    {
      projectImg: 'todoListApp.png',
      projectName: 'Todo List',
      projectDescription: 'IOS mobile application for list what to do.',
      isProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/Todo-List-with-App-Storage',
    },
    {
      projectImg: 'portfolio.png',
      projectName: 'Personal Portfolio',
      projectDescription: 'Webapp personal portfolio.',
      isProjectLinkPresent: true,
      projectLiveLink: 'https://personal-portfolio-jmzsinem9-hadidhardiansyahs-projects.vercel.app',
      isProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/personal-portfolio',
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset + window.innerHeight;

    this.projs.forEach((v, index) => {
      if (index && v && v.nativeElement.offsetTop <= scrollPosition) {
        this.inViewList[index] = true;
      }
    })
  }


}
