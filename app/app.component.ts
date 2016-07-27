import { Component }       from '@angular/core';
import { BookService }     from './book.service';
import { Router } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'my-app',
  template: `
        <div class="container-fluid">
            <nav class="navbar navbar-inverse navbar-fixed-top">

            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed"  data-toggle="collapse" data-target="#navbar" aria-expanded="false"  aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> 
                        <span  class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" style="margin-top: 0px" (click)="gotoList()">Book Manager</a>
                </div>

                <div id="navbar" class="navbar-collapse collapse">
                    <form class="navbar-form navbar-right" action="/books/Search"  method="post">
                    <div class="form-group input-group-sm">
                        <input type="text" name="titleText" placeholder="Search by ID or Word"
                               class="form-control" [(ngModel)]="searchStr" />
                    </div>
                    <button type="submit" class="btn btn-success btn-sm" (click)="submitSearch()">Search</button>
                    <button type="button" class="btn btn-success btn-sm" (click)="gotoNew()">New</button>
                    <button type="button" class="btn btn-success btn-sm" (click)="gotoList()">List</button>
                    <!--\n\
                    <a class="btn btn-success btn-sm" [routerLink]="['/detail']" routerLinkActive="active">New</a>
                    <a class="btn btn-success btn-sm" [routerLink]="['/books']" routerLinkActive="active">List</a>
                    -->
                    </form>
                </div>
                <!--/.navbar-collapse -->
            </div>
            </nav>
        </div>
        <router-outlet></router-outlet>
  `,
    styleUrls: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css', 'css/animate.min.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ BookService ]
})

export class AppComponent {
    title = 'Book Manager';
    searchStr: string;
    
    constructor(
        private router: Router) {}
        
    gotoList() {
        this.router.navigate(['/books']);
    }
    
    gotoNew() {
        this.router.navigate(['/detail']);
    }
    
    submitSearch() {
        this.router.navigate(['/books', this.searchStr]);
    }
}


