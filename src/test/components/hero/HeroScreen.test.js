import { mount } from "enzyme"
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom"
import { HeroScreen } from "../../../components/hero/HeroScreen"


const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <HeroScreen />', () => { 



    test('no debe de mostrar el HeroScreen si no hay un heroe en URL', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>NO HERO</h1> } />
                </Routes>
            </MemoryRouter>

        );
        console.log( wrapper.html() )
        expect(wrapper.find('h1').text().trim() ).toBe('NO HERO')

     });
     test('should debe de mostrar un heroe si el parametro existe y se encuentra', async () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>NO HERO</h1> } />
                </Routes>
            </MemoryRouter>
        );        
        expect(wrapper.find('.row').exists() ).toBe(true)

      });

      test('should debe de regresar a la pantalla anterior', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />                  
                </Routes>
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();
        expect( mockNavigate ).toHaveBeenCalledWith(-1);

       });
       test('debe de mostrar el h1 con NO HERO', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spidersdf34']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />  
                    <Route path="/" element={ <h1>NO HERO</h1> } />                
                </Routes>
            </MemoryRouter>
        );
       expect(wrapper.text() ).toBe('NO HERO')

       })
 })