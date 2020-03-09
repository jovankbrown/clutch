function usernameGen() {
    var text = "";
    var possible = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return 'user' + text;
}

const user = usernameGen();

const inputValues = {
    registration: {
      firstName: 'Ricky',
      lastName:'Richardo',
      street:'123 Powder Lane',
      city:'Atlanta',
      state:'GA',
      zip:'30308',
      phone:'6788992200',
      ssn:'123456789',
      username:user,
      password:'Password1234!'
    }
  };

describe('Clutch technologies Cypress automation examples', () => {
  
    it('Parabank Registration', () => {

        cy.visit('https://parabank.parasoft.com/parabank/index.htm')
        cy.wait(1000);
        //cy.get('input[type="submit"]').click()
        // cy.get('p a[href="register.htm"]').click();
        cy.get('#loginPanel a').eq(1).click();

        cy.get('[id$=firstName]').type(inputValues.registration.firstName);
        cy.get('[id$=lastName').type(inputValues.registration.lastName);
        cy.get('[id$=street').type(inputValues.registration.street);
        cy.get('[id$=city').type(inputValues.registration.city);
        cy.get('[id$=state').type(inputValues.registration.street);
        cy.get('[id$=zipCode').type(inputValues.registration.zip);
        cy.get('[id$=phoneNumber').type(inputValues.registration.phone);
        cy.get('[id$=ssn').type(inputValues.registration.ssn);

        cy.get('[id$=username').type(inputValues.registration.username);
        cy.get('[id$=password').type(inputValues.registration.password);
        cy.get('#repeatedPassword').type(inputValues.registration.password);
        
        cy.get('[value="Register"].button').click();

        cy.get('.title').should('contain', inputValues.registration.username);

      })

    it('should allow the user to test some server functions', () =>{

        cy.server().should((server) => {
            
            // basic cypress functionality
            // the default options on server
            // you can override any of these options
            expect(server.delay).to.eq(0)
            expect(server.method).to.eq('GET')
            expect(server.status).to.eq(200)
            expect(server.headers).to.be.null
            expect(server.response).to.be.null
            expect(server.onRequest).to.be.undefined
            expect(server.onResponse).to.be.undefined
            expect(server.onAbort).to.be.undefined
      
            // These options control the server behavior
            // affecting all requests
      
            // pass false to disable existing route stubs
            expect(server.enable).to.be.true
            // forces requests that don't match your routes to 404
            expect(server.force404).to.be.false
            // whitelists requests from ever being logged or stubbed
            expect(server.whitelist).to.be.a('function')

        })

    })

    it('should allow the user to test the API: POST', () => {

        cy.request({
            method: 'POST',
            url: 'https://httpbin.org/post',
            form: true,
            body: {

                'name' : 'Test', 
                'age' : "12"
            },

            headers: {

                'Content-Type' : 'application/json'

            }

        }).then((response) => {

            expect(response.body).have.property('json');

        });    

    })

    it('should allow the user to test the API: GET', () => {

        cy.request({

            method: 'GET',
            url: 'https://httpbin.org/get'

        }).then((response) => {

            expect(response.body).have.property('url');

        });
          
    })
    
})
