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
        console.log(list);
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
        console.log(list);
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
        console.log(list);
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
    // FUNCTIONS FOR CRUD
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
                <label for="Name">Artist name</label>
                <input type="text" id="Name" name="Name" placeholder="name" value=""/>
                <button type="submit" id="createArtist" value="createArtist">Create artist</button>
                `
            );
        }

        if (SELECT_SEARCH === 'album') {
            console.log('album');

            $('#create-form').empty().append(
                `
                <label for="ArtistId">Artist</label>
                <input type="text" id="ArtistId" name="ArtistId" placeholder="name" value=""/>

                <label for="Title">Album title</label>
                <input type="text" id="Title" name="Title" placeholder="title" value=""/>
                <button type="submit" id="createArtist" value="createArtist">Create album</button>
                `
            );

        }
        if (SELECT_SEARCH === 'track') {
            console.log('track');

            $('#create-form').empty().append(
                `
                <label for="AlbumId">Album</label>
                <input type="text" id="AlbumId" name="AlbumId" placeholder="name" value=""/>
                
                <label for="trackTitle">Track title</label>
                <input type="text" id="trackTitle" name="Name" placeholder="title" value=""/>
                <label for="Milliseconds">Time (millisec)</label>
                <input type="number" id="Milliseconds" name="Milliseconds" placeholder="time" value=""/>
                <label for="Bytes">Size (bytes)</label>
                <input type="number" id="Bytes" name="Bytes" placeholder="size" value=""/>
                <label for="UnitPrice">Price</label>
                <input type="number" id="UnitPrice" name="UnitPrice" placeholder="price" value=""/>
                <label for="GenreId">Genre Id</label>
                <input type="number" id="GenreId" name="GenreId" placeholder="id" value=""/>
                <label for="MediaTypeId">MediaType Id</label>
                <input type="number" id="MediaTypeId" name="MediaTypeId" placeholder="id" value=""/>

                <input type="hidden" name="Composer" id="Composer" value=""/>
                
                <button type="submit" id="update" value="update">update</button>
                `
            );
        }
    }

    // Used to get details for form to update. 
    const getDetails = (e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const id = $($this).closest('tr').data('id');

        console.log('getDetails - id', id);

        if (SELECT_SEARCH === 'artist') {

            $.ajax({
                url: `${ARTIST_ENDPOINT}/${id}`,
                method: 'GET',
                dataType: 'json',
                success: (res) => {
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

        if (SELECT_SEARCH === 'album') {

            $.ajax({
                url: `${ALBUM_ENDPOINT}/${id}`,
                method: 'GET',
                dataType: 'json',
                success: (res) => {
                    console.log('res', res);
                    // modal
                    const modal = $('#update-modal').show();
                    $('#close-update-modal')[0].onclick = () => {
                        modal.hide();
                        $('#update-form').empty();
                    };

                    $('#update-form').empty().append(
                        `
                        <label for="Title">Album Name</label>
                        <input type="text" id="Title" name="Title" value="${res.Title}"/>

                        <input type="hidden" name="AlbumId" id="AlbumId" value="${res.AlbumId}"/>
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

        if (SELECT_SEARCH === 'track') {

            $.ajax({
                url: `${TRACK_ENDPOINT}/${id}`,
                method: 'GET',
                dataType: 'json',
                success: (res) => {
                    console.log('res', res);
                    // modal
                    const modal = $('#update-modal').show();
                    $('#close-update-modal')[0].onclick = () => {
                        modal.hide();
                        $('#update-form').empty();
                    };

                    $('#update-form').empty().append(
                        `
                        <label for="trackTitle">Title</label>
                        <input type="text" id="trackTitle" name="Name" value="${res.trackTitle}"/>
                        <label for="Milliseconds">Time (millisec)</label>
                        <input type="number" id="Milliseconds" name="Milliseconds" value="${res.trackTime}"/>
                        <label for="Bytes">Size (bytes)</label>
                        <input type="number" id="Bytes" name="Bytes" value="${res.trackSize}"/>
                        <label for="UnitPrice">Price</label>
                        <input type="number" id="UnitPrice" name="UnitPrice" value="${res.trackPrice}"/>
                        <label for="GenreId">Genre Id</label>
                        <input type="number" id="GenreId" name="GenreId" value="${res.trackGenreId}"/>
                        <label for="MediaTypeId">MediaType Id</label>
                        <input type="number" id="MediaTypeId" name="MediaTypeId" value="${res.trackMediaTypeId}"/>

                        <input type="hidden" name="Composer" id="Composer" value="${res.trackComposer}"/>
                        <input type="hidden" name="AlbumId" id="AlbumId" value="${res.albumId}"/>
                        <input type="hidden" name="TrackId" id="TrackId" value="${res.trackId}"/>
                        
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
                    alert('Something went wrong. This might not be able to be deleted because of dependencies');
                }
            });
        }
        if (SELECT_SEARCH === 'album') {
            console.log('album', id);

            $.ajax({
                url: `${ALBUM_ENDPOINT}/${id}`,
                method: 'DELETE',
                dataType: 'json',
                success: (res) => {
                    console.log('Delete album - res', res);
                    window.location.href = MUSIC_ADMIN;
                    alert('album deleted');
                },
                error: (error) => {
                    console.log(error);
                    alert('Something went wrong. This might not be able to be deleted because of dependencies');
                }
            });
        }
        if (SELECT_SEARCH === 'track') {
            console.log('track', id);

            $.ajax({
                url: `${TRACK_ENDPOINT}/${id}`,
                method: 'DELETE',
                dataType: 'json',
                success: (res) => {
                    console.log('Delete track - res', res);
                    window.location.href = MUSIC_ADMIN;
                    alert('track deleted');
                },
                error: (error) => {
                    console.log(error);
                    alert('Something went wrong. This might not be able to be deleted because of dependencies');
                }
            });
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

    // TODO: create and update could be more dynamic with switching the endpoint for one call instead of 3.
    // listener for create form  
    $("#create-form").submit((e) => {
        console.log('create-form listener');
        e.preventDefault();
        const $this = $(e.currentTarget);
        const input = $this.serializeArray()
            .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        console.log('input', input);

        if (SELECT_SEARCH === 'artist') {
            $.ajax({
                method: 'POST',
                url: `${ARTIST_ENDPOINT}`,
                dataType: 'json',
                data: input,
                success: (res) => {
                    console.log('create artist - res', res);
                    window.location.href = MUSIC_ADMIN;
                    alert('Artist created');

                }, error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            })
        }

        if (SELECT_SEARCH === 'album') {
            // first search for the artist for the id
            $.ajax({
                url: `${SEARCH_ENDPOINT}?val=${input.ArtistId}`,
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
                    console.log('res', res);
                    // get the artist id
                    console.log('res', res.artists[0].id);
                    // sets name to id found
                    input.ArtistId = res.artists[0].id;

                    console.log('input', input);

                    $.ajax({
                        method: 'POST',
                        url: `${ALBUM_ENDPOINT}`,
                        dataType: 'json',
                        data: input,
                        success: (res) => {
                            console.log('create album - res', res);
                            window.location.href = MUSIC_ADMIN;
                            alert('Album created');

                        }, error: (error) => {
                            console.log(error);
                            alert('we are currently updating our servers. try again later');
                        }
                    })

                }, error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            });
        }

        if (SELECT_SEARCH === 'track') {
            // first search for the album to get id
            $.ajax({
                url: `${SEARCH_ENDPOINT}?val=${input.AlbumId}`,
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
                    console.log('res', res);
                    // get the album id
                    console.log('res', res.albums[0].id);
                    // sets name to id found
                    input.AlbumId = res.albums[0].id;

                    $.ajax({
                        method: 'POST',
                        url: `${TRACK_ENDPOINT}`,
                        dataType: 'json',
                        data: input,
                        success: (res) => {
                            console.log('create track - res', res);
                            window.location.href = MUSIC_ADMIN;
                            alert('Track created');

                        }, error: (error) => {
                            console.log(error);
                            alert('we are currently updating our servers. try again later');
                        }
                    })

                }, error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            });
        }
    });

    // listener for update form 
    $("#update-form").submit((e) => {
        console.log('update-form listener');
        e.preventDefault();
        const $this = $(e.currentTarget);
        const input = $this.serializeArray()
            .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

        console.log('update-form - input', input);

        if (SELECT_SEARCH === 'artist') {
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
        }
        if (SELECT_SEARCH === 'album') {
            $.ajax({
                method: 'POST',
                url: `${ALBUM_ENDPOINT}`,
                dataType: 'json',
                data: input,
                success: (res) => {
                    console.log('update album - res', res);
                    window.location.href = MUSIC_ADMIN;
                    alert('album updated');

                }, error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            })
        }
        if (SELECT_SEARCH === 'track') {
            $.ajax({
                method: 'POST',
                url: `${TRACK_ENDPOINT}`,
                dataType: 'json',
                data: input,
                success: (res) => {
                    console.log('update track - res', res);
                    window.location.href = MUSIC_ADMIN;
                    alert('track updated');

                }, error: (error) => {
                    console.log(error);
                    alert('we are currently updating our servers. try again later');
                }
            })
        }
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
