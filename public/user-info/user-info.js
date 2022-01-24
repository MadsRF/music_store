'use strict';

import {
    GET_USER_INFO_ENDPOINT,
    UPDATE_USER_INFO_ENDPOINT
} from "../script.js";

$(() => {
    console.log('User-info script is running');

    $.ajax({
        url: `${GET_USER_INFO_ENDPOINT}`,
        type: 'GET',
        dataType: 'json',
        statusCode: {
            500: (error) => {
                console.log(error);
                alert('Problems retrieving data from API');
            },
            404: (error) => {
                console.log(error);
                alert('Page not found');
            },
        },
        success: (res) => {

            $('#user_info').append(`
               <label for="FirstName">First Name</label>
                <input type="text" name="FirstName" id="FirstName" value="${res.FirstName}"/>
                <label for="LastName">Last Name</label>
                <input type="text" name="LastName" id="LastName" value="${res.LastName}"/>
                <label for="Company">Company</label>
                <input type="text" name="Company" id="Company" value="${res.Company}"/>
                <label for="Address">Address</label>
                <input type="text" name="Address" id="Address" value="${res.Address}"/>
                <label for="City">City</label>
                <input type="text" name="City" id="City" value="${res.City}"/>
                <label for="State">State</label>
                <input type="text" name="State" id="State" value="${res.State}"/>
                <label for="Country">Country</label>
                <input type="text" name="Country" id="Country" value="${res.Country}"/>
                <label for="PostalCode">Postal Code</label>
                <input type="text" name="PostalCode" id="PostalCode" value="${res.PostalCode}"/>
                <label for="Phone">Phone</label>
                <input type="text" name="Phone" id="Phone" value="${res.Phone}"/>
                <label for="Fax">Fax</label>
                <input type="text" name="Fax" id="Fax" value="${res.Fax}"/>       
                <label for="Email">Email</label>
                <input type="text" name="Email" id="Email" value="${res.Email}"/>
          
                <input type="hidden" name="CustomerId" id="CustomerId" value="${res.CustomerId}"/>         
                <input type="submit" value="update" />`
            );
        }, error: (error) => {
            console.log(error);
            alert('Something went wrong when trying to get user-info. Try again later');
        }
    })


    // Updating user-info
    $("#user_info").submit((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const input = $this.serializeArray().reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        // EX: http://localhost/exam/api/customers
        $.ajax({
            url: UPDATE_USER_INFO_ENDPOINT,
            type: 'POST',
            dataType: 'json',
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
                alert('Updated profile');
            },
            error: (error) => {
                console.log(error);
                alert('Something went wrong when trying to update user. Try again later');
            }
        });

    });

})