const { expect, test } = require('@jest/globals');
const Manager = require('../lib/Manager')

test('creates manager object from extended employee object', () => {
    const manager = new Manager('jeff', '1', 'jeff@live.com', '3');

    expect(manager.name).toBe('jeff')
    expect(manager.id).toBe(1)
    expect(manager.email).toBe('jeff@live.com')
    expect(manager.officeNumber).toBe(3)
})

test('returns role as "Manager"', () => {
    const manager = new Manager('jeff', '1', 'jeff@live.com', '3');
    
    expect(manager.getRole()).toBe('Manager')
})