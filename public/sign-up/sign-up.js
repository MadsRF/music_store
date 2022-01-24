'use strict'

import {
    SIGNUP_ENDPOINT,
    LOGIN_USER_ENDPOINT
} from "../script.js";

$(() => {
    console.log('Sign-up script is running');

    $("#user_signup_form").submit((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);

        const input = $this.serializeArray().reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        if (input["Password"] === input["Password2"]) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
            delete input["Password2"];

            // EX: http://localhost/exam/api/login/customers/
            $.ajax({
                url: SIGNUP_ENDPOINT,
                type: "POST",
                data: input,
                statusCode: {
                    500: (error) => {
                        console.log(error);
                        alert('Problems retrieving data from API');
                    },
                    404: (error) => {
                        console.log(error);
                        alert('Page not found');
                    },
                    401: (error) => {
                        console.log(error);
                        alert('Unauthorized');
                    },
                },
                success: (res) => {
                    window.location.href = LOGIN_USER_ENDPOINT;
                    alert('User was created');
                },
                error: (error) => {
                    console.log(error);
                    alert('Something went wrong when trying to login. Try again later');
                }
            });
        }
    });
})
