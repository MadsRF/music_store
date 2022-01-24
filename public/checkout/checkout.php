<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="public/checkout/checkout.js" type="module" defer></script>
    <link rel="stylesheet" type="text/css" href="public/checkout/checkout.css">
    <title>Checkout</title>
</head>

<body>
    <!-- navbar -->
    <?php
    include_once __DIR__ . '/../navbar/navbar.php';
    echo navbar();
    ?>

    <!-- content -->
    <main>
        <header>
            <h1>Check out</h1>
        </header><br>
        <section>
            <!-- modal for invoice -->
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <dl id="invoice_info"></dl>
                </div>
            </div>

            <header>
                <h2>alternative billing</h2>
            </header>
            <!-- alternative billing -->
            <form id="billing_info" action="#"></form>
        </section>
    </main>

    <!-- footer -->
    <?php
    include_once __DIR__ . '/../footer/footer.php';
    echo footer();
    ?>
</body>

</html>