import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Book} from './book';
import {BookDetailComponent} from './book-detail.component';
import {BookService} from './book.service';

@Component({
    selector: 'my-books',
    template: `
      <div class="container-fluid" style="margin-top: 50px">
        <div class="table table-striped">
            <table class="table table-striped">
                <thead style="background-color: #ddd; color: #222; border-radius: 4px 4px 0 0;">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th colspan="3">Description</th>
                   </tr>
                </thead>
                <tbody *ngIf="books">
                    <tr *ngFor="let book of books" [class.selected]="book === selectedBook">
                        <td><span (click)="editBook(book)">{{book.id}}</span></td>
                        <td>{{book.title}}</td>
                        <td>{{book.author}}</td>
                        <td>{{book.description}}</td>
                        <td><span class="glyphicon glyphicon-edit" (click)="editBook(book)"></span></td>
                        <td><span class="glyphicon glyphicon-trash" (click)="deleteBook(book, $event)"></span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div *ngIf="selectedBook">
            <h2>{{selectedBook.title | uppercase}} is my favorite
            </h2>
            <button (click)="gotoDetail()">View Details</button>
        </div>
    </div>
    `,
    styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .books {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 18em;
  }
  .books li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .books li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .books li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .books .text {
    position: relative;
    top: -3px;
  }
  .books .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.7em 1em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: 0.8em;
    border-radius: 4px 0 0 4px;
  }
    `],
    directives: [BookDetailComponent],
    providers: [BookService]
})

export class BooksComponent implements OnInit { 
    title = "Book Manager";
    books: Book[] = [];
    selectedBook: Book;
    errorMsg: any;
    addingBook = false;
    searchStr: string;
    sub: any;
    navigated = false; // true if navigated here
    
    constructor(
        private router: Router,
        private route: ActivatedRoute, 
        private bookService: BookService) {}
    
    ngOnInit() {
        //this.getAllBooks();
        this.sub = this.route.params.subscribe(params => {
            if (params['str'] !== undefined) {
                let str = +params['str'];
                this.navigated = true;
                this.bookService.searchBooks2('' + str)
                .then(books => this.books = books);
            } else {
                this.navigated = false;
                this.getAllBooks();
            }
        });
    }
    
    onSelect(book: Book) {
        this.selectedBook = book;
    }
    
    addBook() {
        this.addingBook = true;
        this.selectedBook = null;
    }
    
    close(savedBook: Book) {
        this.addingBook = false;
        if (savedBook) { this.getAllBooks(); }
    }
    
    deleteBook(book: Book, event: any) {
        if (confirm('Confirm Delete: ' + book.title)) {
            event.stopPropagation();
            this.bookService
                .deleteBook2(book)
                .then(res => {
                    this.books = this.books.filter(h => h !== book);
                    if (this.selectedBook === book) { this.selectedBook = null; }
                })
                .catch(error => this.errorMsg = error);
        }
    }
    /*
    searchBooks(event: any) {
        event.stopPropagation();
        if (this.searchStr && this.searchStr !== '') {
            this.bookService.searchBooks2(this.searchStr)
                .then(books => this.books = books);
        }
    }
    */
    getAllBooks() {
        return this.bookService.getAllBooks().subscribe(
            books => this.books = books,
            error => this.errorMsg = <any> error
        );
    }
    
    gotoDetail() {
        this.router.navigate(['/detail', this.selectedBook.id]);
    }
    
    editBook(book: Book) {
        this.router.navigate(['/detail', book.id]);
    }
}

const BOOKS: Book[] = [
    {"id": 1, "title": "The Hobbit", "author": "J. R. R. Tolkien", "description": "A Children Fantasy Book"},
    {"id": 2, "title": "Lord of the Rings", "author": "J. R. R. Tolkien", "description": "A Children Fantasy Book"},
    {"id": 3, "title": "Snow White and the Seven Dwarfs", "author": "Brothers Grimm", "description": "A Children Fantasy Book"},
    {"id": 4, "title": "Moby Dick", "author": "Herman Melville", "description": "About the big Whale"},
    {"id": 5, "title": "Snow Crash", "author": "Neal Stephenson", "description": "A Science Fiction Story"},
    {"id": 6, "title": "Game of Thrones", "author": "George R. R. Martin", "description": "A Fantasy Fiction Story"}
];