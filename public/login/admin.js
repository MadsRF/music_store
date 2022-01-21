'use strict'

import {
    ROOT_URL
} from "../script.js";

$(() => {
    console.log('Admin script is running');

    const LOGIN_ADMIN_ENDPOINT = ROOT_URL + 'api/login/admin';
    const HOME_ENDPOINT = ROOT_URL + 'home';

    $("#admin_login_form").submit((e) => {
        // prevents default actions from form
        e.preventDefault();
        // get input value in form
        const $this = $(e.currentTarget);

        // puts value into object
        const input = $this.serializeArray()
            .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        console.log('input', input);
        console.log('LOGIN_USER_ENDPOINT', LOGIN_ADMIN_ENDPOINT);

        // http://localhost/exam/api/login/customers/
        $.ajax({
            url: LOGIN_ADMIN_ENDPOINT,
            type: "POST",
            //data: { username: input["username"], password: input["password"] },
            data: { username: "a", password: "admin" }, // TEMP
            statusCode: {
                500: (e) => {
                    console.log(e);
                    alert('Problems retrieving data from API');
                },
                404: (e) => {
                    console.log(e);
                    alert('Page not found');
                },
                401: (e) => {
                    console.log(e);
                    alert('Unauthorized');
                },
            },
            success: (res) => {
                console.log('res', res);
                window.location.href = HOME_ENDPOINT;

            },
            error: (error) => {
                console.log(error);
                alert('Something went wrong when trying to login. Try again later');
            }
        });
    });



})

