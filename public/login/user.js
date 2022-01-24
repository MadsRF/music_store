'use strict'

import {
    HOME_ENDPOINT,
    LOGIN_USER_ENDPOINT
} from "../script.js";

$(() => {
    console.log('User login script is running');

    $("#user_login_form").submit((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);

        const input = $this.serializeArray().reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        // EX: http://localhost/exam/api/login/customers/
        $.ajax({
            url: LOGIN_USER_ENDPOINT,
            type: "POST",
            //data: { username: input["username"], password: input["password"] },
            data: { username: "luisg@embraer.com.br", password: "customer" }, //TEMP
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
                // redirect to home on success
                window.location.href = HOME_ENDPOINT;
            },
            error: (error) => {
                console.log(error);
                alert('Something went wrong when trying to login. Try again later');
            }
        });
    });



})


