<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="../public/login/admin.js" type="module" defer></script>
    <link rel="stylesheet" type="text/css" href="../public/login/login.css">
    <title>Admin login</title>
</head>

<body>
    <?php
    include_once __DIR__ . '/../navbar/navbar.php';
    echo navbar();
    ?>

    <main>
        <header>
            <h1>Admin login</h1>
        </header>
        <form id="admin_login_form" action="#">
            <input type="text" name="username" id="username" />
            <input type="password" name="password" id="password" />
            <input type="submit" value="Sign in" />
        </form>
    </main>

    <?php
    include_once __DIR__ . '/../footer/footer.php';
    echo footer();
    ?>
</body>

</html>