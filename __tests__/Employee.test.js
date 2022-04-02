const { expect, test } = require('@jest/globals')
const Employee = require('../lib/Employee')

test('creates employee object', () => {
    const employee = new Employee('jeff', '1', 'jeff@live.com')

    expect(employee.name).toBe('jeff')
    expect(employee.id).toBe(1)
    expect(employee.email).toBe('jeff@live.com')
})

test('returns employee name, employee id, employee email, and employee Role', () => {
    const employee = new Employee('jeff', '1', 'jeff@live.com')

    expect(employee.getName()).toBe('Jeff')
    expect(employee.getId()).toBe(1)
    expect(employee.getEmail()).toBe('jeff@live.com')
    expect(employee.getRole()).toBe('Employee')
})
