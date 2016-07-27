import {Injectable} from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Book} from './book';

@Injectable()
export class BookService {
    private bookUrl = "http://localhost:8080/bookmgr";
    private searchUrl = "http://localhost:8080/bookmgr/search/";
    private updateUrl = "http://localhost:8080/bookmgr/update/";
    private editUrl = "http://localhost:8080/bookmgr/edit";
    private newUrl = "http://localhost:8080/bookmgr/new";
    private deleteUrl = "http://localhost:8080/bookmgr/delete/";
    private url: string;
    private currentBook: Book;
    
    constructor(private http: Http) {}
    
    getAllBooks(): Observable<Book[]> {
        return this.http.get(this.bookUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
        
    getBooks() {
        return BOOKS;
    }
    
    searchBooks(searchStr: string) {
        return this.http.get(this.searchUrl + searchStr)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    searchBooks2(searchStr: string): Promise<Book[]> {
        return this.http.get(this.searchUrl + searchStr)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    
    getBook(book: Book): Observable<Book> {
        return this.http.get(this.editUrl + "/" + book.id)
            .map(this.extractBookData)
            .catch(this.handleError);
    }
    
    getBookById(id: number): Promise<Book> {
        return this.http.get(this.editUrl + "/" + id)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    }
    
    saveBook(book: Book): Observable<Book> {
        let body = JSON.stringify({book});
        //let headers = new Headers({'Content-Type': 'Application/json'});
        //let options = new RequestOptions({headers: headers});
            
        return this.http.post(this.updateUrl + book.id, body)
            .map(this.extractBookData)
            .catch(this.handleError);
        //return this.http.post(this.updateUrl + book.id, body)
        //    .toPromise()
        //    .then(this.extractData)
        //    .catch(this.handleError);
    }
    
    saveBook2(book: Book): Promise<Book> {
        let body = JSON.stringify({book});
        //let headers = new Headers({'Content-Type': 'Application/json'});
        //let options = new RequestOptions({headers: headers});
        return this.http.post(this.updateUrl + book.id, body)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    }
    
    newBook(book: Book): Promise<Book> {
        let body = JSON.stringify({book});
        let headers = new Headers({'Content-Type': 'Application/json'});
        let options = new RequestOptions({headers: headers});
            
        return this.http.post(this.newUrl, body)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    }
    
    deleteBook(book: Book): Observable<Book> {
        return this.http.get(this.deleteUrl + book.id)
            .map(this.extractBookData)
            .catch(this.handleError);
    }
    
    deleteBook2(book: Book): Promise<Book> {
        return this.http.get(this.deleteUrl + book.id)
            .toPromise()
            .then(this.extractBookData)
            .catch(this.handleError);
    }
    
    private extractBookData(res: Response) {
        if(res) {
            let body = res.json();
            return body || {};
        }
    }
    
    //private extractData(res: Response) {
    //    let body = Array.from(res.json());
    //    return body || {};
    //}
    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
   
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

const BOOKS : Book[] = [
    {"id": 1, "title": "The Hobbit", "author":"J. R. R. Tolkien", "description":"A Children Fantasy Book"},
    {"id": 2, "title": "Lord of the Rings", "author":"J. R. R. Tolkien", "description":"A Children Fantasy Book"},
    {"id": 3, "title": "Snow White and the Seven Dwarfs", "author":"Brothers Grimm", "description":"A Children Fantasy Book"},
    {"id": 4, "title": "Moby Dick", "author":"Herman Melville", "description":"About the big Whale"},
    {"id": 5, "title": "Snow Crash", "author":"Neal Stephenson", "description":"A Science Fiction Story"},
]


