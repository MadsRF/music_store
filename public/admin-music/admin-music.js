'use strict';

import {
    SEARCH_ENDPOINT,
    ALBUM_ENDPOINT,
    TRACK_ENDPOINT,
    ARTIST_ENDPOINT,
    MUSIC_ADMIN
} from "../script.js";

$(() => {
    console.log('Admin-music script is running');

    let SELECT_SEARCH = 'track'; // default value for option

    /*-----------------------------------------------------------------*/
    // LISTENERS SEARCH INPUT
    /*-----------------------------------------------------------------*/

    $('#search-bar').keyup((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const searchVal = $($this).val();

        if (searchVal) {

            $.ajax({
                url: `${SEARCH_ENDPOINT}?val=${searchVal}`,
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

                    // adds the response to the 
                    if (SELECT_SEARCH === 'artist') { artistTable(res.artists) };
                    if (SELECT_SEARCH === 'album') { albumTable(res.albums) };
                    if (SELECT_SEARCH === 'track') { trackTable(res.tracks) };

                },
                error: (error) => {
                    console.log(error);
                    alert('Something went wrong getting music info. Try again later');
                }
            });

        } else {
            $('#search-table-result').empty();
        }
    }).keyup()


    /*-----------------------------------------------------------------*/
    // CREATE TABLES FOR SEARCH BAR
    /*-----------------------------------------------------------------*/

    const artistTable = (list) => {
        $('#search-table-result')
            .empty()
            .append(
                `<thead>
                <tr>
                    <th>Artist name</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td id='artistName'></td>
                    <td id='updateButton'></td>
                    <td id='deleteButton'></td>
                </tr>
            </tbody>`
            );

        let rows = list.map(item => {
            let $clone = $('#search-table-result tbody tr').clone();

            $clone.data('id', item.id);
            $clone.find('#artistName').text(item.artistName);
            $clone.find('#updateButton').html(`<button id='updateInfo' type='button'>Update</button><br>`);
            $clone.find('#deleteButton').html(`<button id='delete' type='button'>Delete</button><br>`);
            return $clone;
        });
        $('#search-table-result tbody').empty().append(rows);
    }

    const albumTable = (list) => {
        $('#search-table-result')
            .empty()
            .append(
                `<thead>
                    <tr>
                        <th>Artist name</th>
                        <th>Album name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>    
                <tbody>
                    <tr>
                        <td id='artistName'></td>
                        <td id='albumName'></td>
                        <td id='updateButton'></td>
                        <td id='deleteButton'></td>
                    </tr>
                </tbody>`
            );

        let rows = list.map(item => {
            let $clone = $('#search-table-result tbody tr').clone();

            $clone.data('id', item.id);
            $clone.find('#artistName').text(item.artistName);
            $clone.find('#albumName').text(item.albumName);
            $clone.find('#updateButton').html(`<button id='updateInfo' type='button'>Update</button><br>`);
            $clone.find('#deleteButton').html(`<button id='delete' type='button'>Delete</button><br>`);
            return $clone;
        });
        $('#search-table-result tbody').empty().append(rows);
    }

    const trackTable = (list) => {
        $('#search-table-result')
            .empty()
            .append(
                `<thead>
                    <tr>
                        <th>Artist name</th>
                        <th>Album name</th>
                        <th>Track name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>    
                <tbody>
                    <tr>
                        <td id='artistName'></td>
                        <td id='albumName'></td>
                        <td id='trackName'></td>
                        <td id='updateButton'></td>
                        <td id='deleteButton'></td>
                    </tr>
                </tbody>`
            );

        let rows = list.map(item => {
            let $clone = $('#search-table-result tbody tr').clone();

            $clone.data('id', item.id);
            $clone.find('#artistName').text(item.artistName);
            $clone.find('#albumName').text(item.albumName);
            $clone.find('#trackName').text(item.trackName);
            $clone.find('#updateButton').html(`<button id='updateInfo' type='button'>Update</button><br>`);
            $clone.find('#deleteButton').html(`<button id='delete' type='button'>Delete</button><br>`);

            return $clone;

        });
        $('#search-table-result tbody').empty().append(rows);
    }

    /*-----------------------------------------------------------------*/
    // FUNCTIONS
    /*-----------------------------------------------------------------*/

    const createRow = (e) => {
        e.preventDefault();
        console.log('SELECT_SEARCH', SELECT_SEARCH);

        const modal = $('#create-modal').show();
        $('#close-create-modal')[0].onclick = () => {
            modal.hide();
            $('#create-form').empty();
        };

        if (SELECT_SEARCH === 'artist') {
            console.log('artist');

            $('#create-form').empty().append(
                `
                <label for="Name">Artist Name</label>
                <input type="text" id="Name" name="Name" placeholder="name" value=""/>
                <button type="submit" id="createArtist" value="createArtist">create Artist</button>
                `
            );
        }

        if (SELECT_SEARCH === 'album') {
            console.log('album');
        }
        if (SELECT_SEARCH === 'track') {
            console.log('track');
        }
    }

    const getDetails = (e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const id = $($this).closest('tr').data('id');

        if (SELECT_SEARCH === 'artist') {

            $.ajax({
                url: `${ARTIST_ENDPOINT}/${id}`,
                method: 'GET',
                dataType: 'json',
                success: (res) => {

                    // modal
                    const modal = $('#update-modal').show();
                    $('#close-update-modal')[0].onclick = () => {
                        modal.hide();
                        $('#update-form').empty();
                    };

                    $('#update-form').empty().append(
                        `
                        <label for="Name">Artist Name</label>
                        <input type="text" id="Name" name="Name" value="${res.Name}"/>
                        <input type="hidden" name="ArtistId" id="ArtistId" value="${res.ArtistId}"/>
                        <button type="submit" id="update" value="update">update</button>
                        `
                    );
                },
                error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            });
        }

        if (SELECT_SEARCH === 'album') { }

        if (SELECT_SEARCH === 'track') { }
    };


    const deleteRow = (e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const id = $($this).closest('tr').data('id');

        if (SELECT_SEARCH === 'artist') {
            console.log('artist', id);

            $.ajax({
                url: `${ARTIST_ENDPOINT}/${id}`,
                method: 'DELETE',
                dataType: 'json',
                success: (res) => {
                    console.log('Delete artist - res', res);
                    window.location.href = MUSIC_ADMIN;
                    alert('artist deleted');
                },
                error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            });
        }
        if (SELECT_SEARCH === 'album') {
            console.log('album', id);
        }
        if (SELECT_SEARCH === 'track') {
            console.log('track', id);
        }
    }

    /*-----------------------------------------------------------------*/
    // LISTENERS
    /*-----------------------------------------------------------------*/

    // event listener for buttons
    $(document).on('click', '#updateInfo', getDetails);
    $(document).on('click', '#create-entry', createRow);
    $(document).on('click', '#delete', deleteRow);

    // event listener for dropdown
    $('#search-option').on('change', (e) => {
        SELECT_SEARCH = $(e.currentTarget).val();
        $('#search-table-result').empty();
        $('#search-bar').val('');
    });

    // listener for update form 
    $("#update-form").submit((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const input = $this.serializeArray()
            .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        $.ajax({
            method: 'POST',
            url: `${ARTIST_ENDPOINT}`,
            dataType: 'json',
            data: input,
            success: (res) => {
                console.log('update artist - res', res);
                window.location.href = MUSIC_ADMIN;
                alert('artist updated');

            }, error: (error) => {
                console.log(error);
                alert('we are currently updating our servers. try again later');
            }
        })
    });

    // listener for create form 
    $("#create-form").submit((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const input = $this.serializeArray()
            .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        $.ajax({
            method: 'POST',
            url: `${ARTIST_ENDPOINT}`,
            dataType: 'json',
            data: input,
            success: (res) => {
                console.log('create artist - res', res);
                window.location.href = MUSIC_ADMIN;
                alert('artist created');

            }, error: (error) => {
                console.log(error);
                alert('we are currently updating our servers. try again later');
            }
        })
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



});