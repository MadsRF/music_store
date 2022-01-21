<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="public/user-info/user-info.js" type="module" defer></script>
    <link rel="stylesheet" type="text/css" href="public/user-info/user-info.css">
    <title>User-info</title>
</head>

<body>
    <?php
    include_once __DIR__ . '/../navbar/navbar.php';
    echo navbar();
    ?>

    <main>
        <form id="user_info" action="#"></form>
    </main>

    <?php
    include_once __DIR__ . '/../footer/footer.php';
    echo footer();
    ?>

</body>

</html>