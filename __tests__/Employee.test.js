const { expect, test } = require('@jest/globals')
const Employee = require('../lib/Employee')

test('creates employee object', () => {
    const employee = new Employee('jeff', '1', 'jeff@live.com')

    expect(employee.name).toBe('Jeff')
    expect(employee.id).toBe(1)
    expect(employee.email).toBe('jeff@live.com')
})

test('returns employee name, employee id, employee email, and employee Role', () => {
    const employee = new Employee('jeff', '1', 'jeff@live.com')

    expect(employee.getName()).toReturnWith('Jeff')
    expect(employee.getId()).toReturnWith(1)
    expect(employee.getEmail()).toReturnWith('jeff@live.com')
    expect(employee.getRole()).toReturnWith('Employee')
})
