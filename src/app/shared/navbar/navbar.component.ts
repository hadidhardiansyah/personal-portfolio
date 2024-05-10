import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name: string = 'Hadid Hardiansyah';
  active: string = 'Home';
  navbarItems: string[] = [
    'Home',
    'About',
    'Projects',
    'Contact'
  ]
  navbarIconsPath: string[] = [
    'assets/images/home.png',
    'assets/images/about.png',
    'assets/images/project.png',
    'assets/images/contact.png',
  ]

  constructor(private _router: Router) {
  }

  ngOnInit(): void {

  }

  navigateTo(destination: string) {
    this.active = destination;

    switch (destination) {
      case 'Home':
        this._router.navigate(['']);
        break;
      case 'About':
        this._router.navigate(['/about']);
        break;
      case 'Projects':
        this._router.navigate(['/projects']);
        break;
      case 'Contact' :
        document.getElementById("contact").scrollIntoView({behavior: 'smooth'});
        break
      default:
        this._router.navigate(['']);
        break;
    }
  }

  getDestination(item: string) {
    let destination: string = '';

    switch (item) {
      case 'Home':
        return destination = '';
      case 'About':
        return destination = '/about'
      case 'Projects':
        return destination = '/projects'
      default:
        return destination = '';
    }
  }

}
