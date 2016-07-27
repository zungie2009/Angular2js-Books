"use strict";
var router_1 = require('@angular/router');
var books_component_1 = require('./books.component');
var dashboard_component_1 = require('./dashboard.component');
var book_detail_component_1 = require('./book-detail.component');
var routes = [
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'books',
        component: books_component_1.BooksComponent
    },
    {
        path: '',
        redirectTo: '/books',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: book_detail_component_1.BookDetailComponent
    },
    {
        path: 'detail',
        component: book_detail_component_1.BookDetailComponent
    },
    {
        path: 'books/:str',
        component: books_component_1.BooksComponent
    },
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
var RouterProviders = (function () {
    function RouterProviders(router) {
        this.router = router;
    }
    RouterProviders.prototype.searchBooks = function () {
        if (this.searchStr && this.searchStr !== '') {
            alert(this.searchStr);
        }
    };
    return RouterProviders;
}());
exports.RouterProviders = RouterProviders;
//# sourceMappingURL=app.routes.js.map