"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var book_detail_component_1 = require('./book-detail.component');
var book_service_1 = require('./book.service');
var BooksComponent = (function () {
    function BooksComponent(router, route, bookService) {
        this.router = router;
        this.route = route;
        this.bookService = bookService;
        this.title = "Book Manager";
        this.books = [];
        this.addingBook = false;
        this.navigated = false; // true if navigated here
    }
    BooksComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.getAllBooks();
        this.sub = this.route.params.subscribe(function (params) {
            if (params['str'] !== undefined) {
                var str = +params['str'];
                _this.navigated = true;
                _this.bookService.searchBooks2('' + str)
                    .then(function (books) { return _this.books = books; });
            }
            else {
                _this.navigated = false;
                _this.getAllBooks();
            }
        });
    };
    BooksComponent.prototype.onSelect = function (book) {
        this.selectedBook = book;
    };
    BooksComponent.prototype.addBook = function () {
        this.addingBook = true;
        this.selectedBook = null;
    };
    BooksComponent.prototype.close = function (savedBook) {
        this.addingBook = false;
        if (savedBook) {
            this.getAllBooks();
        }
    };
    BooksComponent.prototype.deleteBook = function (book, event) {
        var _this = this;
        if (confirm('Confirm Delete: ' + book.title)) {
            event.stopPropagation();
            this.bookService
                .deleteBook2(book)
                .then(function (res) {
                _this.books = _this.books.filter(function (h) { return h !== book; });
                if (_this.selectedBook === book) {
                    _this.selectedBook = null;
                }
            })
                .catch(function (error) { return _this.errorMsg = error; });
        }
    };
    /*
    searchBooks(event: any) {
        event.stopPropagation();
        if (this.searchStr && this.searchStr !== '') {
            this.bookService.searchBooks2(this.searchStr)
                .then(books => this.books = books);
        }
    }
    */
    BooksComponent.prototype.getAllBooks = function () {
        var _this = this;
        return this.bookService.getAllBooks().subscribe(function (books) { return _this.books = books; }, function (error) { return _this.errorMsg = error; });
    };
    BooksComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedBook.id]);
    };
    BooksComponent.prototype.editBook = function (book) {
        this.router.navigate(['/detail', book.id]);
    };
    BooksComponent = __decorate([
        core_1.Component({
            selector: 'my-books',
            template: "\n      <div class=\"container-fluid\" style=\"margin-top: 50px\">\n        <div class=\"table table-striped\">\n            <table class=\"table table-striped\">\n                <thead style=\"background-color: #ddd; color: #222; border-radius: 4px 4px 0 0;\">\n                    <tr>\n                        <th>ID</th>\n                        <th>Title</th>\n                        <th>Author</th>\n                        <th colspan=\"3\">Description</th>\n                   </tr>\n                </thead>\n                <tbody *ngIf=\"books\">\n                    <tr *ngFor=\"let book of books\" [class.selected]=\"book === selectedBook\">\n                        <td><span (click)=\"editBook(book)\">{{book.id}}</span></td>\n                        <td>{{book.title}}</td>\n                        <td>{{book.author}}</td>\n                        <td>{{book.description}}</td>\n                        <td><span class=\"glyphicon glyphicon-edit\" (click)=\"editBook(book)\"></span></td>\n                        <td><span class=\"glyphicon glyphicon-trash\" (click)=\"deleteBook(book, $event)\"></span></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n        <div *ngIf=\"selectedBook\">\n            <h2>{{selectedBook.title | uppercase}} is my favorite\n            </h2>\n            <button (click)=\"gotoDetail()\">View Details</button>\n        </div>\n    </div>\n    ",
            styles: ["\n  .selected {\n    background-color: #CFD8DC !important;\n    color: white;\n  }\n  .books {\n    margin: 0 0 2em 0;\n    list-style-type: none;\n    padding: 0;\n    width: 18em;\n  }\n  .books li {\n    cursor: pointer;\n    position: relative;\n    left: 0;\n    background-color: #EEE;\n    margin: .5em;\n    padding: .3em 0;\n    height: 1.6em;\n    border-radius: 4px;\n  }\n  .books li.selected:hover {\n    background-color: #BBD8DC !important;\n    color: white;\n  }\n  .books li:hover {\n    color: #607D8B;\n    background-color: #DDD;\n    left: .1em;\n  }\n  .books .text {\n    position: relative;\n    top: -3px;\n  }\n  .books .badge {\n    display: inline-block;\n    font-size: small;\n    color: white;\n    padding: 0.7em 1em 0 0.7em;\n    background-color: #607D8B;\n    line-height: 1em;\n    position: relative;\n    left: -1px;\n    top: -4px;\n    height: 1.8em;\n    margin-right: 0.8em;\n    border-radius: 4px 0 0 4px;\n  }\n    "],
            directives: [book_detail_component_1.BookDetailComponent],
            providers: [book_service_1.BookService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, book_service_1.BookService])
    ], BooksComponent);
    return BooksComponent;
}());
exports.BooksComponent = BooksComponent;
var BOOKS = [
    { "id": 1, "title": "The Hobbit", "author": "J. R. R. Tolkien", "description": "A Children Fantasy Book" },
    { "id": 2, "title": "Lord of the Rings", "author": "J. R. R. Tolkien", "description": "A Children Fantasy Book" },
    { "id": 3, "title": "Snow White and the Seven Dwarfs", "author": "Brothers Grimm", "description": "A Children Fantasy Book" },
    { "id": 4, "title": "Moby Dick", "author": "Herman Melville", "description": "About the big Whale" },
    { "id": 5, "title": "Snow Crash", "author": "Neal Stephenson", "description": "A Science Fiction Story" },
    { "id": 6, "title": "Game of Thrones", "author": "George R. R. Martin", "description": "A Fantasy Fiction Story" }
];
//# sourceMappingURL=books.component.js.map