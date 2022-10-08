const it = require('./framework').it;
const expect = require('./framework').expect;
const saludar = require('./app');

it('La función saluda', () => {
  expect(saludar('Platzi')).toBe('Hola Platzi');
});

expect(x).toEqual(y)             // Verifica si ambos valores son iguales.
expect(x).toBe(y)                // Verifica si ambos objetos son iguales.
expect(x).toMatch(pattern)       // Verifica si el valor pertenece al patrón establecido.
expect(x).toBeDefined()          // Verifica si el valor está definido.
expect(x).toBeUndefined()        // Verifica si el valor es indefinido.
expect(x).toBeNull()             // Verifica si el valor es nulo.
expect(x).toBeTruthy()           // Verifica si el valor es verdadero.
expect(x).toBeFalsy();           // Verifica si el valor es falso.
expect(x).toContain(y)           // Verifica si el valor actual contiene el esperado.
expect(x).toBeLessThan(y)        // Verifica si el valor actual es menor que el esperado.
expect(x).toBeGreaterThan(y)     // Verifica si el valor actual es mayor que el esperado.
expect(x).toBeNegativeInfinity() // Verifica si el valor actual es Infinity
expect(x).toBePositiveInfinity() // Verifica si el valor actual es null

// Usando regex para comparar comparar cadenas de texto
describe('jasmine.stringMatching', () => {
    it("matches as a regexp", () => {
      expect({foo: 'bar'})
        .toEqual({foo: jasmine.stringMatching(/^bar$/)});
      expect({foo: 'foobarbaz'})
        .toEqual({foo: jasmine.stringMatching('bar')});
    });
  
  describe("when used with a spy", () => {
      it("comparing arguments", () => {
        const callback = jasmine.createSpy('callback');
        callback('foobarbaz');
        expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('bar'));
        expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
      });
    })
});