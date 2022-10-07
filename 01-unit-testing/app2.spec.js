// Pasamos como parametro la palabra Platzi al metodo Saludar y nos debe retornar "Hola Platzi"
it('La función saluda', () => {
  expect(saludar('Platzi')).toBe('Hola Platzi');
});