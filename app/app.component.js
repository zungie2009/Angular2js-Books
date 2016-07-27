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
var book_service_1 = require('./book.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        this.title = 'Book Manager';
    }
    AppComponent.prototype.gotoList = function () {
        this.router.navigate(['/books']);
    };
    AppComponent.prototype.gotoNew = function () {
        this.router.navigate(['/detail']);
    };
    AppComponent.prototype.submitSearch = function () {
        this.router.navigate(['/books', this.searchStr]);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <div class=\"container-fluid\">\n            <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n\n            <div class=\"container\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle collapsed\"  data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"  aria-controls=\"navbar\">\n                        <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> \n                        <span  class=\"icon-bar\"></span>\n                    </button>\n                    <a class=\"navbar-brand\" style=\"margin-top: 0px\" (click)=\"gotoList()\">Book Manager</a>\n                </div>\n\n                <div id=\"navbar\" class=\"navbar-collapse collapse\">\n                    <form class=\"navbar-form navbar-right\" action=\"/books/Search\"  method=\"post\">\n                    <div class=\"form-group input-group-sm\">\n                        <input type=\"text\" name=\"titleText\" placeholder=\"Search by ID or Word\"\n                               class=\"form-control\" [(ngModel)]=\"searchStr\" />\n                    </div>\n                    <button type=\"submit\" class=\"btn btn-success btn-sm\" (click)=\"submitSearch()\">Search</button>\n                    <button type=\"button\" class=\"btn btn-success btn-sm\" (click)=\"gotoNew()\">New</button>\n                    <button type=\"button\" class=\"btn btn-success btn-sm\" (click)=\"gotoList()\">List</button>\n                    <!--\n                    <a class=\"btn btn-success btn-sm\" [routerLink]=\"['/detail']\" routerLinkActive=\"active\">New</a>\n                    <a class=\"btn btn-success btn-sm\" [routerLink]=\"['/books']\" routerLinkActive=\"active\">List</a>\n                    -->\n                    </form>\n                </div>\n                <!--/.navbar-collapse -->\n            </div>\n            </nav>\n        </div>\n        <router-outlet></router-outlet>\n  ",
            styleUrls: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css', 'css/animate.min.css'],
            directives: [router_2.ROUTER_DIRECTIVES],
            providers: [book_service_1.BookService]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map