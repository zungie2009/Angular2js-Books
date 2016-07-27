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
var book_service_1 = require('./book.service');
var book_1 = require('./book');
var BookDetailComponent = (function () {
    function BookDetailComponent(bookService, route, router) {
        this.bookService = bookService;
        this.route = route;
        this.router = router;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    BookDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.bookService.getBookById(id)
                    .then(function (book) { return _this.book = book; });
            }
            else {
                _this.navigated = false;
                _this.book = new book_1.Book();
            }
        });
    };
    BookDetailComponent.prototype.save = function () {
        var _this = this;
        if (this.book.id > 0) {
            this.bookService
                .saveBook2(this.book)
                .then(function (book) {
                _this.book = book; // saved hero, w/ id if new
                _this.goBack(book);
            })
                .catch(function (error) { return _this.error = error; }); // TODO: Display error message
        }
        else {
            this.bookService.newBook(this.book)
                .then(function (book) {
                _this.book = book;
                _this.router.navigate(['/books']);
            })
                .catch(function (error) { return _this.error = error; });
        }
    };
    BookDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BookDetailComponent.prototype.goBack = function (savedBook) {
        if (savedBook === void 0) { savedBook = null; }
        this.close.emit(savedBook);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', book_1.Book)
    ], BookDetailComponent.prototype, "book", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BookDetailComponent.prototype, "close", void 0);
    BookDetailComponent = __decorate([
        core_1.Component({
            selector: 'book-detail',
            template: "\n     <div *ngIf=\"book\" class=\"containter-fluid\"  style=\"margin-top: 65px\">\n            <form>\n            <div class=\"container-fluid\">\n                <table width=\"60%\" cellspacing=\"2\" cellpadding=\"2\">\n                    <tr>\n                        <th colspan=\"2\"><h2 class=\"form-signin-heading\">Edit {{book.title}}</h2></th>\n                    </tr>\n                    <tr>\n                        <td>Title</td>\n                        <td><input type=\"text\" name=\"title\" id=\"inputTitle\"\n                                   class=\"form-control\" placeholder=\"Book Title\"\n                                   [(ngModel)]=\"book.title\" /></td>\n                    </tr>\n                    <tr>\n                        <td>Author</td>\n                        <td><input type=\"text\" name=\"author\" id=\"inputAuthor\"\n                                   class=\"form-control\" placeholder=\"Book Author\"\n                                   [(ngModel)]=\"book.author\" /></td>\n                    </tr>\n                    <tr>\n                        <td>Description</td>\n                        <td><input type=\"text\" name=\"description\"\n                                   id=\"inputDescription\" class=\"form-control\"\n                                   placeholder=\"Description\" [(ngModel)]=\"book.description\" /></td>\n                    </tr>\n                    <tr>\n                        <td colspan=\"2\" align=\"center\"><div\n                                style=\"width: 40%; padding-top: 5px;\">\n                                <button class=\"btn btn-md btn-primary\" type=\"button\" (click)=\"save()\">Save</button>\n                                 <button class=\"btn btn-md btn-primary\" type=\"button\" (click)=\"goBack()\">Back</button>\n                            </div></td>\n                    </tr>\n                </table>\n            </div>\n            </form>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [book_service_1.BookService, router_1.ActivatedRoute, router_1.Router])
    ], BookDetailComponent);
    return BookDetailComponent;
}());
exports.BookDetailComponent = BookDetailComponent;
//# sourceMappingURL=book-detail.component.js.map