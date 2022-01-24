<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="public/sign-up/sign-up.js" type="module" defer></script>
    <link rel="stylesheet" type="text/css" href="public/sign-up/sign-up.css">
    <title>Sign-up</title>
</head>

<body>
    <!-- navbar -->
    <?php
    include_once __DIR__ . '/../navbar/navbar.php';
    echo navbar();
    ?>
    <!-- content -->
    <main>
        <header class="head_text">
            <h1>Sign-up</h1>
        </header>
        <!-- sign-up form -->
        <form id="user_signup_form">
            <label for="FirstName">First name</label>
            <input type="text" id="FirstName" name="FirstName" />
            <label for="LastName">Last name</label>
            <input type="text" id="LastName" name="LastName" />
            <label for="Company">Company</label>
            <input type="text" id="Company" name="Company" />
            <label for="Address">Address</label>
            <input type="text" id="Address" name="Address" />
            <label for="City">City</label>
            <input type="text" id="City" name="City" />
            <label for="State">State</label>
            <input type="text" id="State" name="State" />
            <label for="Country">Country</label>
            <input type="text" id="Country" name="Country" />
            <label for="PostalCode">PostalCode</label>
            <input type="text" id="PostalCode" name="PostalCode" />
            <label for="Phone">Phone</label>
            <input type="text" id="Phone" name="Phone" />
            <label for="Fax">Fax</label>
            <input type="text" id="Fax" name="Fax" />
            <label for="Email">Email</label>
            <input type="text" id="Email" name="Email" />

            <label for="Password">Password</label>
            <input type="text" id="Password" name="Password" />
            <label for="Password2">Confirim password</label>
            <input type="text" id="Password2" name="Password2" />

            <input type="submit" value="Sign up" />
        </form>
    </main>

    <!-- footer -->
    <?php
    include_once __DIR__ . '/../footer/footer.php';
    echo footer();
    ?>
</body>

</html>