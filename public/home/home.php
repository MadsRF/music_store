<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="public/home/home.js" type="module" defer></script>
    <link rel="stylesheet" type="text/css" href="public/home/home.css">
    <title>Home</title>
</head>

<body>
    <?php
    include_once __DIR__ . '/../navbar/navbar.php';
    echo navbar();
    ?>

    <main>
        <!-- The Modal div -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <dl id="descriptive_list_info"></dl>
            </div>
        </div>

        <section>
            <select id="search_option" name="search_option">
                <option value="track">Track</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
            </select>

            <input type="text" minlength="1" maxlength="50" id="search-bar" value="" placeholder="Search..." required autocomplete="off">
            <table id="table_search_result"></table>
        </section>

    </main>

    <?php
    include_once __DIR__ . '/../footer/footer.php';
    echo footer();
    ?>
</body>

</html>