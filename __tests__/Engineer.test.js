const Engineer = require('../lib/Engineer')

test('creates engineer object from extended employee object', () => {
    const engineer = new Engineer('jeff', '4', 'jeffery@live.com', 'jeffCodes')

    expect(engineer.name).toBe('jeff')
    expect(engineer.id).toBe(4)
    expect(engineer.email).toBe('jeffery@live.com')
    expect(engineer.github).toBe('jeffCodes')
})

test('returns github username and the overwritten role', () => {
    const engineer = new Engineer('jeff', '4', 'jeffery@live.com', 'jeffCodes')

    expect(engineer.getGithub()).toBe('jeffCodes')
    expect(engineer.getRole()).toBe('Engineer')
})