// TODO: Write code to define and export the Employee class
// class = new syntax for a contructor function (ceates instance of an object)
    //changed syntax, but still a constructor functions behind the scenes (for people who use other languages)
    // sytactic sugar

    class Employee {
        //properties inside of the constructor 
        constructor(name, id, email) {
            // this . = value of parameter/prototypes
            this.name = name;
            this.id = id;
            this.email = email;
        }
        //creating prototype methods outisde of constructor function
        //return the name of the employee
        getName() {
            return this.name;
        };
        //return the id of the employee
        getId() {
            return this.id;
        }
        //return the email of the employee
        getEmail() {
            return this.email;
        }
        getRole() {
            return "Employee";
        }
    }

    module.exports = Employee;

//    * name
//   * id
//   * email
//   * getName()
//   * getId()
//   * getEmail()
//   * getRole() // Returns 'Employee'

//setters/getters = protect the integrity of the property from outsiders