import { pluck, range } from "./utils"

describe( 'utils' , () => {
    describe('range',  () => {
        it('return correct range from 1 to 4' , () => {
            expect(range(1,5)).toEqual([1,2,3,4])
        })
    })

    describe('pluck', () => {
        it('return correct result', () => {
            const data = [
                {"id":1 , name: 'foo'},
                {"id":2 , name: 'bar'},
                {"id":3 , name: 'baz'}
            ]
            expect(pluck(data, "id")).toEqual([1,2,3])
        } )
    })
})