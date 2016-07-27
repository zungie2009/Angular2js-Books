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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var http_1 = require('@angular/http');
var BookService = (function () {
    function BookService(http) {
        this.http = http;
        this.bookUrl = "http://localhost:8080/bookmgr";
        this.searchUrl = "http://localhost:8080/bookmgr/search/";
        this.updateUrl = "http://localhost:8080/bookmgr/update/";
        this.editUrl = "http://localhost:8080/bookmgr/edit";
        this.newUrl = "http://localhost:8080/bookmgr/new";
        this.deleteUrl = "http://localhost:8080/bookmgr/delete/";
    }
    BookService.prototype.getAllBooks = function () {
        return this.http.get(this.bookUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookService.prototype.getBooks = function () {
        return BOOKS;
    };
    BookService.prototype.searchBooks = function (searchStr) {
        return this.http.get(this.searchUrl + searchStr)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BookService.prototype.searchBooks2 = function (searchStr) {
        return this.http.get(this.searchUrl + searchStr)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    BookService.prototype.getBook = function (book) {
        return this.http.get(this.editUrl + "/" + book.id)
            .map(this.extractBookData)
            .catch(this.handleError);
    };
    BookService.prototype.getBookById = function (id) {
        return this.http.get(this.editUrl + "/" + id)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    };
    BookService.prototype.saveBook = function (book) {
        var body = JSON.stringify({ book: book });
        //let headers = new Headers({'Content-Type': 'Application/json'});
        //let options = new RequestOptions({headers: headers});
        return this.http.post(this.updateUrl + book.id, body)
            .map(this.extractBookData)
            .catch(this.handleError);
        //return this.http.post(this.updateUrl + book.id, body)
        //    .toPromise()
        //    .then(this.extractData)
        //    .catch(this.handleError);
    };
    BookService.prototype.saveBook2 = function (book) {
        var body = JSON.stringify({ book: book });
        //let headers = new Headers({'Content-Type': 'Application/json'});
        //let options = new RequestOptions({headers: headers});
        return this.http.post(this.updateUrl + book.id, body)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    };
    BookService.prototype.newBook = function (book) {
        var body = JSON.stringify({ book: book });
        var headers = new http_1.Headers({ 'Content-Type': 'Application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.newUrl, body)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    };
    BookService.prototype.deleteBook = function (book) {
        return this.http.get(this.deleteUrl + book.id)
            .map(this.extractBookData)
            .catch(this.handleError);
    };
    BookService.prototype.deleteBook2 = function (book) {
        return this.http.get(this.deleteUrl + book.id)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    };
    BookService.prototype.extractBookData = function (res) {
        if (res) {
            var body = res.json();
            return body || {};
        }
    };
    //private extractData(res: Response) {
    //    let body = Array.from(res.json());
    //    return body || {};
    //}
    BookService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    BookService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    BookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
var BOOKS = [
    { "id": 1, "title": "The Hobbit", "author": "J. R. R. Tolkien", "description": "A Children Fantasy Book" },
    { "id": 2, "title": "Lord of the Rings", "author": "J. R. R. Tolkien", "description": "A Children Fantasy Book" },
    { "id": 3, "title": "Snow White and the Seven Dwarfs", "author": "Brothers Grimm", "description": "A Children Fantasy Book" },
    { "id": 4, "title": "Moby Dick", "author": "Herman Melville", "description": "About the big Whale" },
    { "id": 5, "title": "Snow Crash", "author": "Neal Stephenson", "description": "A Science Fiction Story" },
];
//# sourceMappingURL=book.service.js.map