'use strict'

import {
    LOGOUT_ENDPOINT,
    HOME_ENDPOINT
} from "../script.js";

$(() => {
    console.log('Navbar script is running');

    const logout = () => {
        // EX: http://localhost/exam/api/logout/
        $.ajax({
            url: LOGOUT_ENDPOINT,
            type: 'GET', 
            dataType: 'json', 
            success: (res) => {
                console.log(res);
                window.location.href = HOME_ENDPOINT;
            }, error: (error) => {
                console.log(error);
                alert('Something went wrong. Try again later');
            }
        });
    }
    // listener
    $(document).on('click', '#logout', logout);
});