<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="public/admin-music/admin-music.js" type="module" defer></script>
    <link rel="stylesheet" type="text/css" href="public/admin-music/admin-music.css">
    <title>Admin-music</title>
</head>

<body>
    <!-- navbar -->
    <?php
    include_once __DIR__ . '/../navbar/navbar.php';
    echo navbar();
    ?>

    <!-- main content -->
    <main>
        <header>
            <h2>Music Administration</h2>
        </header>

        <div id="update-modal" class="modal">
            <div class="modal-content">
                <span id="close-update-modal" class="close">&times;</span>
                <form id="update-form"></form>
            </div>
        </div>

        <div id="create-modal" class="modal">
            <div class="modal-content">
                <span id="close-create-modal" class="close">&times;</span>
                <form id="create-form"></form>
            </div>
        </div>

        <section>
            <!-- select options -->
            <select id="search-option" name="search-option">
                <option value="track">Track</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
            </select>
            <!-- create -->
            <button id="create-entry">Create</button>
            <!-- search -->
            <input type="text" minlength="1" maxlength="50" id="search-bar" value="" placeholder="Search..." required autocomplete="off">
            <table id="search-table-result"></table>
        </section>
    </main>

    <!-- footer -->
    <?php
    include_once __DIR__ . '/../footer/footer.php';
    echo footer();
    ?>
</body>

</html>