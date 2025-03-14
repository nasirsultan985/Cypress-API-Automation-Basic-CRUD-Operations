/// <reference types= "cypress" /> 
/*
    This is a Basic API automation for understanding of new learners. No Framework, Custom commands and fixtures
    are used for keeping the learning simple. This will help to understand how you can Automate API using cypress.
    Once you have a grip on this, you can structure it in a framework. 

    Author: Nasir Sultan
*/

describe('Basic API Automation - CRUD Operations - Herokuapp', function () {

    const baseUrl = "https://restful-booker.herokuapp.com"
    let bookingid;
    let authtoken;

    //Create booking and store the booking id in variable bookingid
    it('TC-1: Create booking', function () {

        cy.request('Post', baseUrl + "/booking",
            {
                "firstname": "API",
                "lastname": "Test",
                "totalprice": 333,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2023-01-01",
                    "checkout": "2024-01-01"
                },
                "additionalneeds": "Dinner"
            }
        ).then((response) => {

            expect(response.body).to.have.property("bookingid")
            bookingid = response.body.bookingid
            cy.log(bookingid)
        })


    })

    //Fetch the records of newly created booking and verify first and lastname
    it('TC-2: Fetch Booking details of newly created booking', function () {

        cy.request('Get', baseUrl + "/booking/" + bookingid)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.firstname).to.eq('API')
                expect(response.body.lastname).to.eq('Test')
            })
    })


    //Fetch All bookng IDs
    it('TC-3: Get All Bookings IDs', function () {

        cy.request('Get', baseUrl + "/booking")
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    //Update booking records without any permission or authorization. It shouldn't get updated
    it('TC-4: [Negative] Update Booking Details Without Permission', function () {
        cy.log(bookingid)
        cy.request({
            method: 'Put',
            url: `${baseUrl}/booking/${bookingid}`,
            body: {
                "firstname": "Automation",
                "lastname": "Test",
            },

            failOnStatusCode: false     //cypress bydefault fails the test with status codes 4xx. Use this config to handle it.

        }).then((response) => {

            expect(response.status).to.eq(403)
            expect(response.body).to.include("Forbidden")
        })
    })

    //Delete booking records without any permission or authorization. It shouldn't get deleted.
    it('TC-5: [Negative] Delete Booking Without Permissions', function () {

        cy.request({
            method: 'Delete',
            url: `${baseUrl}/booking/${bookingid}`,

            failOnStatusCode: false     //cypress bydefault fails the test with status codes 4xx. Use this config to handle it.

        }).then((response) => {
            expect(response.status).to.eq(403)
            expect(response.body).to.include('Forbidden')
        })
    })

    //Login and verfiy successful login. Also save assign the token in authtoken variable
    it('TC-6: Authentication', function () {
        cy.request({
            method: 'Post',
            url: `${baseUrl}/auth`,
            body: {
                "username": "admin",
                "password": "password123"
            }

        }).then((response) => {
            expect(response.status).to.eq(200)
            authtoken = response.body.token
        })
    })

    //Update the Booking details sucessfully using authtoken
    it('TC-7: Update Booking Details Successfully and Validate', function () {
        cy.request({
            method: 'Put',
            url: `${baseUrl}/booking/${bookingid}`,
            headers: {
                cookie: `token=${authtoken}`,
            },
            body: {
                "firstname": "Automation",
                "lastname": "Test",
                "totalprice": 150,   // Required
                "depositpaid": true, // Required
                "bookingdates": {    // Required
                    "checkin": "2025-03-01",
                    "checkout": "2025-03-10"
                },
                "additionalneeds": "Breakfast"
            },

            failOnStatusCode: false         //cypress bydefault fails the test with status codes 4xx. Use this config to handle it.
        },

        ).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    //Delete the Booking sucessfully using authtoken
    it('TC-8: Delete booking successfully', function () {
        cy.log(authtoken)
        cy.request({
            method: 'Delete',
            url: `${baseUrl}/booking/${bookingid}`,
            headers: {
                cookie: `token=${authtoken}`,
            }

        }).then((response) => {
            expect(response.status).to.eq(201)
        })

    })

    //Verify that Deleted booking is no longer available
    it('TC-9: Verify Booking is successfully deleted', function () {
        cy.request({
            method: 'Get',
            url: `${baseUrl}/booking/${bookingid}`,

            failOnStatusCode: false     //cypress bydefault fails the test with status codes 4xx. Use this config to handle it.


        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.include('Not Found')

        })
    })
})