'use strict'

import {
    ROOT_URL
} from "../script.js";

$(() => {
    console.log('Navbar script is running');

    const LOGOUT_ENDPOINT = ROOT_URL + 'api/logout';
    const HOME_ENDPOINT = ROOT_URL + 'home';

    const logout = () => {
        console.log('logout');
        // EX: http://localhost/exam/api/logout/
        $.ajax({
            url: LOGOUT_ENDPOINT,
            type: 'GET', // setting the http method
            dataType: 'json', // added data type
            success: (res) => {
                console.log(res);
                window.location.href = HOME_ENDPOINT;
            }, error: (error) => {
                console.log(error);
                alert('Something went wrong. Try again later');
            }
        });
    }
    $(document).on('click', '#logout', logout);
});