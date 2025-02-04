import { TestBed } from "@angular/core/testing"
import { UserService } from "./users.services"
import { UserInterface } from "../types/user.interface"
import { UtilsService } from "./utils.service"


describe("User Service" , () => {
    let userService: UserService
    let utilsService: UtilsService
    // const utilsServiceMock = {
    //     pluck: jest.fn()
    // }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService,UtilsService
                //  {provide: UtilsService , useValue: utilsServiceMock}
                ]
        })

        userService = TestBed.inject(UserService);
        utilsService = TestBed.inject(UtilsService)
    })

    it('creates a service' , () => {
        expect(userService).toBeTruthy();
    })

    describe('addUser' , () => {
        it('should add a user' , () => {
            const user: UserInterface = {
                id: '2',
                name: 'foo'
            }
            userService.addUser(user)
            expect(userService.users).toEqual([{id:'2',name: 'foo'}])
        })
    })

    describe('remove user', () => {
        it('should remove a user', () => {
            userService.users = [{id : '2' , name: 'foo'}]
            userService.removeUser('2')
            expect(userService.users).toEqual([])
        })
    })

    // describe( 'get user name', () => {
    //     utilsServiceMock.pluck.mockReturnValue(['foo'])
    //     it('should return user names', () => {
    //         expect(userService.getUsernames()).toEqual(['foo'])
    //     })
    // })

    describe( 'get user name', () => {
        it('should return user names', () => {
            jest.spyOn(utilsService,'pluck')
            userService.users = [{id : '2' , name: 'foo'}];
            userService.getUsernames();
            expect(utilsService.pluck).toHaveBeenCalledWith(
                userService.users,'name'
            )
            
        })
    })
})