'use strict'

import {
    CART_ENDPOINT,
    TRACK_ENDPOINT,
    CHECKOUT_ENDPOINT
} from "../script.js";

$(() => {
    console.log('Cart script is running');

    /*-----------------------------------------------------------------*/
    // GET CART DATA AND CREATE TABLE
    /*-----------------------------------------------------------------*/

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
            console.log('get cart info - res', res);

            let trackList = [];

            trackList.push(res);
            console.log(trackList);

            $.ajax({
                url: `${TRACK_ENDPOINT}/?id=${trackList}`,
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
                    console.log('get track info - res', res);

                    $('#tracks_to_buy').empty().append(
                        `
                            <thead>
                                <tr>
                                    <th>track Title</th>
                                    <th>Album</th>
                                    <th>Artist</th>
                                    <th>Track composer</th>
                                    <th>Genre</th>
                                    <th>Track media type</th>
                                    <th>Track price</th>
                                </tr>
                            </thead>    
                            <tbody>
                                <tr>
                                    <td id='trackTitle'></td>
                                    <td id='albumName'></td>
                                    <td id='artistName'></td>
                                    <td id='trackComposer'></td>
                                    <td id='trackGenre'></td>
                                    <td id='trackMediaType'></td>
                                    <td id='trackPrice'></td>
                                </tr>
                            </tbody>
                        `
                    );

                    let rows = res.map(item => {
                        let $clone = $('#tracks_to_buy tbody tr').clone();

                        $clone.find('#trackTitle').text(item.trackTitle);
                        $clone.find('#albumName').text(item.albumName);
                        $clone.find('#artistName').text(item.artistName);
                        $clone.find('#trackComposer').text(item.trackComposer);
                        $clone.find('#trackGenre').text(item.trackGenre);
                        $clone.find('#trackMediaType').text(item.trackMediaType);
                        $clone.find('#trackPrice').text(item.trackPrice);
                        
                        return $clone;
                    });
                    $('#tracks_to_buy tbody').empty().append(rows);

                }, error: (error) => {
                    console.log(error);
                    alert('Something went wrong getting info. Try again later');
                }
            })
        }, error: (error) => {
            console.log(error);
            alert('Something went wrong getting info. Try again later');
        }
    })

    /*-----------------------------------------------------------------*/
    // EVENT LISTENERS
    /*-----------------------------------------------------------------*/

    // go to checkout
    $(document).on('click', '#checkout', (e) => {
        window.location.href = CHECKOUT_ENDPOINT;
    });

})