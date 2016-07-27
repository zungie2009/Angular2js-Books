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
var DashboardComponent = (function () {
    function DashboardComponent(router, bookService) {
        this.router = router;
        this.bookService = bookService;
        this.books = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getAllBooks();
    };
    DashboardComponent.prototype.getAllBooks = function () {
        var _this = this;
        this.bookService.getAllBooks().subscribe(function (allBooks) { return _this.books = allBooks; }, function (error) { return _this.errorMessage = error; });
    };
    DashboardComponent.prototype.gotoDetail = function (book) {
        var link = ['/detail', book.id];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            template: "\n        <div style=\"margin-top:40px;\">\n            <h3>Book List</h3>\n            <div class=\"grid grid-pad\">\n                <div *ngFor=\"let book of books\" (click)=\"gotoDetail(book)\" class=\"col-1-4\">\n                    <div class=\"module hero\">\n                        <h4>{{book.title}}</h4>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [book_service_1.BookService],
        }), 
        __metadata('design:paramtypes', [router_1.Router, book_service_1.BookService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map