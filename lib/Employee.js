// name, id, email, getName(), getId(), getEmail(), getRole() (which returns employee)
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = parseInt(id);
        this.email = email;
    }

    getName() {
        // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;