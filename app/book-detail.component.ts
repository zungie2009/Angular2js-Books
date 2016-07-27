import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BookService} from './book.service';
import {Book} from './book';

@Component({
  selector: 'book-detail',
  template: `
     <div *ngIf="book" class="containter-fluid"  style="margin-top: 65px">
            <form>
            <div class="container-fluid">
                <table width="60%" cellspacing="2" cellpadding="2">
                    <tr>
                        <th colspan="2"><h2 class="form-signin-heading">Edit {{book.title}}</h2></th>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td><input type="text" name="title" id="inputTitle"
                                   class="form-control" placeholder="Book Title"
                                   [(ngModel)]="book.title" /></td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td><input type="text" name="author" id="inputAuthor"
                                   class="form-control" placeholder="Book Author"
                                   [(ngModel)]="book.author" /></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" name="description"
                                   id="inputDescription" class="form-control"
                                   placeholder="Description" [(ngModel)]="book.description" /></td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center"><div
                                style="width: 40%; padding-top: 5px;">\n\
                                <button class="btn btn-md btn-primary" type="button" (click)="save()">Save</button>
                                 <button class="btn btn-md btn-primary" type="button" (click)="goBack()">Back</button>
                            </div></td>
                    </tr>
                </table>
            </div>
            </form>
    </div>
    `
})

export class BookDetailComponent implements OnInit, OnDestroy {
    @Input() book: Book;
    @Output() close = new EventEmitter();
    error: any;
    sub: any;
    navigated = false; // true if navigated here
    
    constructor(
        private bookService: BookService,
        private route: ActivatedRoute,
        private router: Router) {
    }
    
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.bookService.getBookById(id)
                .then(book => this.book = book);
            } else {
                this.navigated = false;
                this.book = new Book();
            }
        });
    }
    
    save() {
        if (this.book.id > 0) {
            this.bookService
                .saveBook2(this.book)
                .then(book => {
                    this.book = book; // saved hero, w/ id if new
                    this.goBack(book);
                })
                .catch(error => this.error = error); // TODO: Display error message
        } else {
            this.bookService.newBook(this.book)
                .then(book => {
                    this.book = book; 
                    this.router.navigate(['/books']);
                })
                .catch(error => this.error = error); 
        }
    }
    
    ngOnDestroy() {
       this.sub.unsubscribe();
    }

    goBack(savedBook: Book = null) {
        this.close.emit(savedBook);
        if (this.navigated) { window.history.back(); }
    }
}


