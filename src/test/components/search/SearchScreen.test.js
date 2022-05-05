import { mount } from "enzyme";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Pruebas en <SearchScreen />', () => { 
    test('Debe de mostrarse correctamente con valores por defecto', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Buscar un héroe')
    })

    test('should debe de  mostrar a batman y el valor del queryString', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        )
            expect( wrapper.find('input').prop('value') ).toBe('batman');
     })

     test('should debe de mostrar el error al no encontrar el heroe', () => { 
         
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
        )
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No hay resultados: batman123');

      })
      test('should debe de llamar el navigate a la nueva pantalla', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
        );
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        })
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })
         expect( mockNavigate ).toHaveBeenCalledWith('?q=batman')

       })
 })