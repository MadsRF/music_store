<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="public/cart/cart.js" type="module" defer></script>
    <link rel="stylesheet" type="text/css" href="public/cart/cart.css">
    <title>Cart</title>
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
            <h1>Cart</h1>
        </header>

        <section>
            <!-- checks to see if user -->
            <?php if (isset($_SESSION["is_user"])) {
                echo <<<HTML
                    <button id="checkout" type="submit">Checkout</button> 
                HTML;
            } else {
                echo <<<HTML
                <h2>please log in first</h2>
                HTML;
            }
            ?>
            <!-- holds cart -->
            <table id="tracks_to_buy"></table>
        </section>
    </main>

    <!-- footer -->
    <?php
    include_once __DIR__ . '/../footer/footer.php';
    echo footer();
    ?>
</body>

</html>