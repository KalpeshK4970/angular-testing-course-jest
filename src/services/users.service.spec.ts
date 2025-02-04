import { TestBed } from "@angular/core/testing"
import { UserService } from "./users.services"
import { UserInterface } from "../types/user.interface"


describe("User Service" , () => {
    let userService: UserService
    beforeEach(() => {
       
        TestBed.configureTestingModule({
            providers: [UserService]
        })

        userService = TestBed.inject(UserService);
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
})