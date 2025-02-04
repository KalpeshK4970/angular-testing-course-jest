import { TestBed } from "@angular/core/testing"
import { ApiService } from "./api.service"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { UserInterface } from "../types/user.interface"
import { HttpErrorResponse, HttpResponse } from "@angular/common/http"


describe('ApiService' , () => {
    let apiService: ApiService
    let httpTestingController: HttpTestingController
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        })

        apiService = TestBed.inject(ApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    }) 

    afterEach(() => {
        httpTestingController.verify(); // ensures nothings is pending and everything is resetted
    })

    describe('getTags' , () => {
        it('should return a list of tags', () => {
            let data : UserInterface[] | undefined
            apiService.getTags().subscribe( response => {
                data = response
            })

            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush([{id: '1' ,name: 'foo'}])
            expect(data).toEqual([{id: '1' ,name: 'foo'}]);
        })
    })

    describe('createTags', () => {
        it('should create a tag' , () => {
            let data : UserInterface | undefined
            apiService.createTags('foo').subscribe( response => {
                data = response
            })
    
            const req = httpTestingController.expectOne('http://localhost:3004/tags')
            req.flush({id: '1' ,name: 'foo'})
            expect(data).toEqual({id: '1', name: 'foo'})
            expect(req.request.method).toEqual('POST')
            expect(req.request.body).toEqual({name: 'foo'})
        })

        it('throws an error if request fails', () => {
            let actualError: HttpErrorResponse | undefined
            apiService.createTags('foo').subscribe({
             next: () => {
                fail("Success should not be called")
             },
             error: (err) => {
                actualError = err;
             }
            })  
            
            const req = httpTestingController.expectOne('http://localhost:3004/tags');
            req.flush('Server Error' , {
                status: 422,
                statusText: 'Unprocessible entity'
            })

            if(!actualError){
                throw new Error('Error needs to be defined')
            }

            expect(actualError.status).toEqual(422)
            expect(actualError.statusText).toEqual('Unprocessible entity')
        })

    })
})