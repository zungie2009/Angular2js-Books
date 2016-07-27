import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
    selector: 'my-dashboard',
    template: `
        <div style="margin-top:40px;">
            <h3>Book List</h3>
            <div class="grid grid-pad">
                <div *ngFor="let book of books" (click)="gotoDetail(book)" class="col-1-4">
                    <div class="module hero">
                        <h4>{{book.title}}</h4>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [BookService],
})

export class DashboardComponent {
    books: Book[] = [];
    errorMessage: any;
    
    constructor(
        private router: Router, 
        private bookService: BookService) { }
    
    ngOnInit() {
        this.getAllBooks();
    }
    
    getAllBooks() {
        this.bookService.getAllBooks().subscribe(
            allBooks => this.books = allBooks,
            error => this.errorMessage = <any>error
        );
    }
    
    gotoDetail(book: Book) { 
        let link = ['/detail', book.id];
        this.router.navigate(link);
    }
}



