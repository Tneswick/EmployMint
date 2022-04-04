const Intern = require('../lib/Intern')

test('creates an intern object from extended employee object', () => {
    const intern = new Intern('todd', '6', 'todd@live.com', 'UC Berkeley')

    expect(intern.name).toBe('todd')
    expect(intern.id).toBe(6)
    expect(intern.email).toBe('todd@live.com')
    expect(intern.school).toBe('UC Berkeley')
})

test('returns intern school and overwritten role', () => {
    const intern = new Intern('todd', '6', 'todd@live.com', 'UC Berkeley')

    expect(intern.getSchool()).toBe('UC Berkeley')
    expect(intern.getRole()).toBe('Intern')
})