import { AppRouter } from "../../routers/AppRouter"
import { mount } from 'enzyme'
import { AuthContext } from "../../auth/authContext"

describe('Pruebas en <AppRouter />', () => { 
    const contextValue = {
        user: {
            logged: false
        }
    }

    test('should debe de mostrar login si no esta autenticado', () => { 

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        )
        console.log( wrapper.html() )
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login' )

     }) 
     test('should debe de mostrar el componente de MarvelScreen si está autenticado', () => { 

        const contextValue = {
            user: {
                logged:true,
                name: 'cristobal'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        )
        console.log( wrapper.html() )
        expect( wrapper ).toMatchSnapshot()
        
        expect( wrapper.find('.navbar').exists() ).toBe( true )

     })       
})