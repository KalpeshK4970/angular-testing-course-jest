import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FooterComponent } from "./footer.component"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { By } from "@angular/platform-browser"
import { TodosService } from "../../services/todos.service"
import { FilterEnum } from "../../types/filter.enum"

describe('FooterComponent' , () => {
    let component: FooterComponent
    let fixture: ComponentFixture<FooterComponent>
    let todosService: TodosService

    beforeEach(() => {
        TestBed.configureTestingModule({
           imports: [FooterComponent, HttpClientTestingModule] 
        }).compileComponents()

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance
        todosService = TestBed.inject(TodosService)
        fixture.detectChanges();
    })

    it('creates a component' , () => {
        expect(component).toBeTruthy();
    })

    describe('component visibility', () => {
        it('should be hidden when no todos', () => {
            const footer = fixture.debugElement.query(
                By.css('[data-testid="footer"]')
            )
            expect(footer.classes['hidden']).toEqual(true)
        })

        it('should be visible with todos', () => {
            todosService.todosSig.set([{id:'1',text: 'foo',isCompleted: false}]);
            fixture.detectChanges();
            const footer = fixture.debugElement.query(
                By.css('[data-testid="footer"]')
            )
            expect(footer.classes['hidden']).not.toBeDefined();

        })

    })

   describe('counters' , () => {
    it('renders counter for 1 todo', () => {
        todosService.todosSig.set([{id:'1',text: 'foo',isCompleted: false}]);
        fixture.detectChanges();  
        const todoCount = fixture.debugElement.query(
            By.css('[data-testid="todoCount"]')
        )  
        expect(todoCount.nativeElement.textContent) .toEqual('1 item left ')  
    })

    it('renders counter for multiple todos', () => {
        todosService.todosSig.set([{id:'1',text: 'foo',isCompleted: false},
                                   {id:'2',text: 'lea',isCompleted: false}  ])

        fixture.detectChanges();
        const todoCount = fixture.debugElement.query(
            By.css('[data-testid="todoCount"]')
        )  
        expect(todoCount.nativeElement.textContent).toEqual('2 items left ')
    })
   }) 

   describe('filters',() => {
    it('highlights default filter', () => {
        const filterLinks = fixture.debugElement.queryAll(
            By.css('[data-testid="filterLink"]')
        )

        expect(filterLinks[0].classes['selected']).toBe(true)
    })

    it('highlights changed filter', () => {
        todosService.filterSig.set(FilterEnum.active)
        fixture.detectChanges();
        const filterLinks = fixture.debugElement.queryAll(
            By.css('[data-testid="filterLink"]')
        )     
        expect(filterLinks[1].classes['selected']).toBe(true)   
    })

    it('changes a filter', () => {
        const filterLinks = fixture.debugElement.queryAll(
            By.css('[data-testid="filterLink"]')
        )     
        
        filterLinks[2].triggerEventHandler('click');
        expect(todosService.filterSig()).toBe(FilterEnum.completed)

    })
   })
})