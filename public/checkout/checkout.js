'use strict'

import {
    GET_USER_INFO_ENDPOINT,
    CART_ENDPOINT,
    INVOICE_ENDPOINT,
    HOME_ENDPOINT
} from "../script.js";

$(() => {
    console.log('Checkout script is running');

    /*-----------------------------------------------------------------*/
    // GET USER INFO AND CART FOR BILLING AND CREATE TABLE
    /*-----------------------------------------------------------------*/

    // gets what in cart session
    $.ajax({
        url: `${CART_ENDPOINT}`,
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

            let trackList = [];
            trackList.push(res);

            //gets user info for alternative billing
            $.ajax({
                url: `${GET_USER_INFO_ENDPOINT}`,
                type: 'GET',
                dataType: 'json',
                statusCode: {
                    500: (e) => {
                        console.log(e);
                        alert('Problems retrieving data from API');
                    },
                    404: (e) => {
                        console.log(e);
                        alert('Page not found');
                    },
                },
                success: (res) => {
                    console.log('res', res);

                    $('#billing_info').append(
                        `
                        <label for="address">Billing Address</label>
                        <input type="text" name="address" id="address" value="${res.Address}"/>
                        <label for="city">City</label>
                        <input type="text" name="city" id="city" value="${res.City}"/>
                        <label for="state">State</label>
                        <input type="text" name="state" id="state" value="${res.State}"/>
                        <label for="country">Country</label>
                        <input type="text" name="country" id="country" value="${res.Country}"/>
                        <label for="postalCode">Postal Code</label>
                        <input type="text" name="postalCode" id="postalCode" value="${res.PostalCode}"/>
        
                        <input type="hidden" name="customerId" id="CustomerId" value="${res.CustomerId}"/>
                        <input type="hidden" name="trackIds" id="trackIds" value="${trackList}"/>
        
                        <input type="submit" value="ok" />
                        `
                    );

                }, error: (e) => {
                    alert('error', e);
                }
            })

        }
    });

    /*-----------------------------------------------------------------*/
    // EVENT LISTENERS
    /*-----------------------------------------------------------------*/

    $("#billing_info").submit((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);

        // puts value into object
        const input = $this.serializeArray()
            .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        // EX: http://localhost/exam/api/invoices
        $.ajax({
            url: INVOICE_ENDPOINT,
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

                // EX: http://localhost/exam/api/invoices/id
                $.ajax({
                    url: `${INVOICE_ENDPOINT}/${res.invoice_id}`,
                    method: 'GET',
                    dataType: 'json',
                    success: (res) => {
                        console.log('GET invoice res', res);

                        const modal = $('#myModal').show();

                        $('.close')[0].onclick = function () {
                            modal.hide();
                            $('#invoice_info').empty();
                            window.location.href = HOME_ENDPOINT;
                        };

                        $('#invoice_info').append(`
                                <dt>Billing Address</dt>
                                <dd id='BillingAddress'>- ${res.invoiceInfo.BillingAddress}</dd>
                                <dt>Billing City</dt>
                                <dd id='BillingCity'>- ${res.invoiceInfo.BillingCity}</dd>
                                <dt>Billing Country</dt>
                                <dd id='BillingCountry'>- ${res.invoiceInfo.BillingCountry}</dd>
                                <dt>Billing Postal Code</dt>
                                <dd id='BillingPostalCode'>- ${res.invoiceInfo.BillingPostalCode}</dd>            
                                <dt>Billing State</dt>
                                <dd id='BillingState'>- ${res.invoiceInfo.BillingState}</dd>
                                <dt>Customer Name</dt>
                                <dd id='CustomerName'>- ${res.invoiceInfo.CustomerName}</dd>
                                <dt>Invoice Date</dt>
                                <dd id='InvoiceDate'>- ${res.invoiceInfo.InvoiceDate}</dd>
                                <dt>InvoiceId</dt>
                                <dd id='Invoice Id'>- ${res.invoiceInfo.InvoiceId}</dd>
                                <dt>Total</dt>
                                <dd id='Total'>- ${res.invoiceInfo.Total}</dd>`
                        );

                        // Loops through orders product name
                        let tracks = res.tracks.map(track => `<tr><td>${track.TrackName} - ${track.UnitPrice}</td></tr><br>`);
                        tracks = tracks.toString().replace(/,/g, "");

                        $('#invoice_info').append(`<dt>Tracks</dt><dd id='tracks'>${tracks}</dd>`);

                    },
                    error: (error) => {
                        console.log(error);
                        alert('Something went wrong getting the invoice. try again later');
                    }
                });
            },
            error: (error) => {
                console.log(error);
                alert('Something went wrong. Try again later');
            }
        });
    });
})