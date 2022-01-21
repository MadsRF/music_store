// with strict mode, you can not, for example, use undeclared variables. ex: x = 3.14; 
'use strict'

import {
    ROOT_URL
} from "../script.js";

// shorthand declaration of jQuery instead of .ready()
$(() => {
    console.log('Home script is running');

    const SEARCH_ENDPOINT = ROOT_URL + 'api/searches';
    const ARTIST_ENDPOINT = ROOT_URL + 'api/artists';
    const ALBUM_ENDPOINT = ROOT_URL + 'api/albums';
    const TRACK_ENDPOINT = ROOT_URL + 'api/tracks';

    let SELECT_SEARCH = 'artist'; // default value

    /*-----------------------------------------------------------------*/
    // LISTENERS SEARCH INPUT
    /*-----------------------------------------------------------------*/

    // getting the value from searchbar input on typing
    $('#searchbar').keyup((e) => {
        // since arrow func. can't use the 'this' keyword to get value, has to you currentTarget 
        const $this = $(e.currentTarget);
        const inputValue = $($this).val();
        console.log('inputValue', inputValue);

        // check if any input. if not error because query is empty
        if (inputValue) {

            $.ajax({
                url: `${SEARCH_ENDPOINT}?val=${inputValue}`,
                type: 'GET', // setting the http method
                dataType: 'json', // added data type
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

                    if (SELECT_SEARCH === 'artist') {
                        artistTable(res.artists);
                    }

                    if (SELECT_SEARCH === 'album') {
                        albumTable(res.albums);
                    }
                    if (SELECT_SEARCH === 'track') {
                        trackTable(res.tracks);
                    }

                },
                error: (error) => {
                    console.log(error);
                    alert('Something went wrong getting music info. Try again later');
                }
            });

        } else {
            $('#table_search_result').empty();
        }
    }).keyup()


    /*-----------------------------------------------------------------*/
    // CREATE TABLES
    /*-----------------------------------------------------------------*/

    const artistTable = (list) => {

        $('#table_search_result')
            .empty()
            .append(
                `<thead>
                <tr>
                    <th>type</th>
                    <th>Artist name</th>
                    <th>more</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td id='type'></td>
                    <td id='artistName'></td>
                    <td id='button'></td>
                </tr>
            </tbody>`
            );

        // loop over results and print to table
        let rows = list.map(item => {

            // create a clone of the table tbody tr to create dynamic row (only appends once)
            let $clone = $('#table_search_result tbody tr').clone();

            $clone.data('id', item.id);
            $clone.find('#type').text(item.type);
            $clone.find('#artistName').text(item.artistName);

            // finds button and inserts html
            $clone.find('#button').html(`<button id='show_more_info' type='button'>info</button><br>`);

            return $clone;

        });
        //appends to table
        $('#table_search_result tbody').empty().append(rows);

    }

    const albumTable = (list) => {

        $('#table_search_result')
            .empty()
            .append(
                `<thead>
            <tr>
                <th>type</th>
                <th>Artist name</th>
                <th>Album name</th>
                <th>more</th>
            </tr>
        </thead>    
        <tbody>
            <tr>
                <td id='type'></td>
                <td id='artistName'></td>
                <td id='albumName'></td>
                <td id='button'></td>
            </tr>
        </tbody>`
            );

        // loop over results and print to table
        let rows = list.map(item => {

            // create a clone of the table tbody tr to create dynamic row (only appends once)
            let $clone = $('#table_search_result tbody tr').clone();

            $clone.data('id', item.id);
            $clone.find('#type').text(item.type);
            $clone.find('#artistName').text(item.artistName);
            $clone.find('#albumName').text(item.albumName);

            // finds button and inserts html
            $clone.find('#button').html(`<button id='show_more_info' type='button'>info</button><br>`);

            return $clone;

        });
        //appends to table
        $('#table_search_result tbody').empty().append(rows);

    }
    const trackTable = (list) => {

        $('#table_search_result')
            .empty()
            .append(
                `<thead>
                <tr>
                    <th>type</th>
                    <th>Artist name</th>
                    <th>Album name</th>
                    <th>Track name</th>
                    <th>more</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td id='type'></td>
                    <td id='artistName'></td>
                    <td id='albumName'></td>
                    <td id='trackName'></td>
                    <td id='button'></td>
                </tr>
            </tbody>`
            );

        // loop over results and print to table
        let rows = list.map(item => {

            // create a clone of the table tbody tr to create dynamic row (only appends once)
            let $clone = $('#table_search_result tbody tr').clone();

            $clone.data('id', item.id);
            $clone.find('#type').text(item.type);
            $clone.find('#artistName').text(item.artistName);
            $clone.find('#albumName').text(item.albumName);
            $clone.find('#trackName').text(item.trackName);

            // finds button and inserts html
            $clone.find('#button').html(`<button id='show_more_info' type='button'>info</button><br>`);

            return $clone;

        });
        //appends to table
        $('#table_search_result tbody').empty().append(rows);

    }

    /*-----------------------------------------------------------------*/
    // DETAILS MODAL
    /*-----------------------------------------------------------------*/

    // get additional info about row when clicking info button 
    const getDetails = (e) => {
        const $this = $(e.currentTarget);
        const id = $($this).closest('tr').data('id');


        if (SELECT_SEARCH === 'artist') {
            // EX: http://localhost/exam/api/albums/?artistId=2
            $.ajax({
                method: 'GET', // setting the http method
                url: `${ALBUM_ENDPOINT}/?artistId=${id}`,
                dataType: 'json', // added data type
                success: (res) => {
                    console.log('getDetails, artist - res', res);
                    const modal = $('#myModal').show();

                    $('.close')[0].onclick = function () {
                        modal.hide();
                        $('#descriptive_list_info').empty();
                    };

                    let list_of_albums = res.map(Album => `<tr><td> - ${Album.Title}</td></tr><br>`);
                    $('#descriptive_list_info').append(
                        `
                        <dd id='list_of_albums'>${list_of_albums}</dd>
                        `
                    );

                },
                error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            });
        }

        if (SELECT_SEARCH === 'album') {
            // EX: http://localhost/exam/api/albums/1/tracks
            $.ajax({
                method: 'GET', // setting the http method
                url: `${ALBUM_ENDPOINT}/${id}/tracks`,
                dataType: 'json', // added data type
                success: (res) => {
                    console.log('getDetails, album - res', res);

                    // Get the modal ex. from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
                    const modal = $('#myModal').show();

                    // Get the <span> element that closes the modal. When the user clicks on <span> (x), close the modal
                    $('.close')[0].onclick = function () {
                        modal.hide();
                        // empties modal
                        $('#descriptive_list_info').empty();
                    };
                    // tracks
                    let list_of_tracks = res.tracks.map(tracks => `<tr><td> - ${tracks.trackTitle}</td></tr><br>`);
                    list_of_tracks = list_of_tracks.toString().replace(/,/g, "");

                    $('#descriptive_list_info').append(
                        `
                        <h2 id="trackTitle">${res.album.albumName}</h2><br>
                        <dt>Tracks</dt>
                        <dd id='list_of_tracks'>${list_of_tracks}</dd>
                        `
                    );
                },
                error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            });
        }

        // EX: http://localhost/exam/api/tracks/1
        if (SELECT_SEARCH === 'track') {
            console.log('getDetails, track');
            $.ajax({
                method: 'GET', // setting the http method
                url: `${TRACK_ENDPOINT}/${id}`,
                dataType: 'json', // added data type
                success: (res) => {
                    console.log('getDetails - res', res);

                    // Get the modal ex. from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
                    const modal = $('#myModal').show();

                    // Get the <span> element that closes the modal. When the user clicks on <span> (x), close the modal
                    $('.close')[0].onclick = function () {
                        modal.hide();
                        // empties modal
                        $('#descriptive_list_info').empty();
                    };
                    $('#descriptive_list_info').append(
                        `
                        <h2 id="trackTitle">${res.trackTitle}</h2><br>
                        <dt>Album</dt>
                        <dd id='albumName'>- ${res.albumName}</dd>
                        <dt>Artist</dt>
                        <dd id='artistName'>- ${res.artistName}</dd>
                        <dt>Track composer</dt>
                        <dd id='trackComposer'>- ${res.trackComposer}</dd>
                        <dt>Genre</dt>
                        <dd id='trackGenre'>- ${res.trackGenre}</dd>
                        <dt>Track media type</dt>
                        <dd id='trackMediaType'>- ${res.trackMediaType}</dd>
                        <dt>Track price</dt>
                        <dd id='trackPrice'>- ${res.trackPrice}</dd>
                        <dt>Track size</dt>
                        <dd id='trackSize'>- ${bytesToSize(res.trackSize)}</dd>
                        <dt>Track time</dt>
                        <dd id='trackTime'>- ${millisToMinutesAndSeconds(res.trackTime)} min.</dd>
                        `
                    );
                },
                error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            });
        }



    };


    /*-----------------------------------------------------------------*/
    // ROW AND OPTION EVENT LISTENERS
    /*-----------------------------------------------------------------*/

    // event listener for 'more info' button
    $(document).on('click', '#show_more_info', getDetails);


    // event listener for dropdown
    $('#search_option').on('change', (e) => {
        SELECT_SEARCH = $(e.currentTarget).val();
        $('#table_search_result').empty();
        $('#searchbar').val('');
    });

    /*-----------------------------------------------------------------*/
    // CONVERSIONS
    /*-----------------------------------------------------------------*/

    // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    // https://www.codegrepper.com/code-examples/javascript/convert+milliseconds+to+seconds+javascript
    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

})