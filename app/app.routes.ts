import { provideRouter, RouterConfig, Router }  from '@angular/router';
import { BooksComponent } from './books.component';
import {DashboardComponent} from './dashboard.component';
import {BookDetailComponent} from './book-detail.component';

const routes: RouterConfig = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: '',
        redirectTo: '/books',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: BookDetailComponent
    },
    {
        path: 'detail',
        component: BookDetailComponent
    },
    {
        path: 'books/:str',
        component: BooksComponent
    },
];

export const appRouterProviders = [
    provideRouter(routes)
];

export class RouterProviders {
    searchStr: string;
    
    constructor(private router: Router) {}
    
    public searchBooks() {
        if (this.searchStr && this.searchStr !== '') {
            alert(this.searchStr);
        }
    }
}


