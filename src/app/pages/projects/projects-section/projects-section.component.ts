import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { fade, fadeInView, staggerFade } from 'src/app/animations/animations';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
  animations: [
    fadeInView
  ]
})
export class ProjectsSectionComponent implements OnInit {

  @ViewChildren(ProjectCardComponent ,{ read: ElementRef }) projs: QueryList<ElementRef>
  inViewList: Array<boolean> = [];

  projects: Array<any> = [
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
      projectDescription: 'Webapp to explore more about your zodiac sign and which celebrity one shares it’s zodiac sign.',
      isProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/Todo-List-with-App-Storage',
    },
  ]
  constructor() { }

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
