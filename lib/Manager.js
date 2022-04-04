// officeNumber, getRole() overwrites and returns Manager
const Employee = require('./Employee')

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = parseInt(officeNumber);
    }

    getRole () {
        return 'Manager'
    }
}

module.exports = Manager;