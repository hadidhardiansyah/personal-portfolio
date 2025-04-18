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
      projectImg: '',
      projectName: 'Book Management Website',
      projectDescription: 'Built both frontend UI using Angular with bootstrap framework for styling and backend API for managing list books that have the status sharable, archived, borrowed or returned, including the ability to Create, Get, and Delete books based on the role held. Implement registration and login including email verification and activation with a Secure token. The technologies used are Angular 19, Bootstrap, Spring Boot, PostgreSQL. Configured PostgreSQL for data storage, including creating database tables and providing SQL scripts for deployment.',
      isProjectGithubLinkPresent: true,
      isMultipleProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/restful-api-book-social-network',
      projectSecondGithubLink: 'https://github.com/hadidhardiansyah/book-network-ui',
    },
    {
      projectImg: 'foodStallApp.png',
      projectName: 'Food Stall Website',
      projectDescription: 'Built both frontend UI using React TypeScript and backend API for managing food items in a stall, including the ability to Create, Get, and Delete food, restaurant, etc. The technologies used are React TypeScript, Java, Spring Boot, MySQL. Used Spring Boot for the API and MySQL for database management.',
      isProjectGithubLinkPresent: true,
      isMultipleProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/RestAPI-Bills-Food',
      projectSecondGithubLink: 'https://github.com/hadidhardiansyah/Bills-Food-UI',
    },
    {
      projectImg: 'fitnessApp.png',
      projectName: 'Fitness Website',
      projectDescription: 'Building a Fitness App. For the frontend, using React, Typescript, Vite, Tailwind, Hero Icons, Framer Motion, Form Submit, React Anchor Link Smooth Scroll with Responsive page. The technologies used are React TypeScript, Vite, React Hooks, Tailwind CSS, Framer Motion, React Anchor Link Smooth Scroll.',
      isProjectGithubLinkPresent: true,
      projectGithubLink: 'https://github.com/hadidhardiansyah/fitness-app',
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
