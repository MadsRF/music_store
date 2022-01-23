<?php

include_once __DIR__ . '/../../env.php';

function navbar()
{

    // ROUTES
    $homeRoute = Env::$INDEX_DIR . '/home';
    //$logoutRoute = Env::$INDEX_DIR . '/logout';
    $signupRoute = Env::$INDEX_DIR . '/sign-up';

    $userLoginRoute = Env::$INDEX_DIR . '/login/user';
    $userInfoRoute = Env::$INDEX_DIR . '/user-info';
    $cartRoute = Env::$INDEX_DIR . '/cart';

    $adminLoginRoute = Env::$INDEX_DIR . '/login/admin';
    $adminMusicRoute = Env::$INDEX_DIR . '/admin-music';

    // MENU ITEMS
    $home = 'Home';
    $signup = 'Signup';
    $logout = 'Logout';

    $user = 'User login';
    $admin = 'Admin login';

    $cart = 'Cart';
    $userInfo = 'User Info';
    $adminMusic = 'Music Administration';


    // if user is logged in
    if (isset($_SESSION["is_user"])) {
        return
            <<<HTML
             <script src="public/navbar/navbar.js" type="module" defer></script>
                <header>
                    <ul>
                        <li><a href="$homeRoute">$home</a></li>
                        <li><a href="$cartRoute">$cart</a></li>
                        <li><a href="$userInfoRoute">$userInfo</a></li>
                        <li><a id="logout">$logout</a></li>
                    </ul>
                </header>
            HTML;
    }
    // if admin is logged in
    elseif (isset($_SESSION["is_admin"])) {
        return
            <<<HTML
             <script src="public/navbar/navbar.js" type="module" defer></script>

                <header>
                    <ul>
                        <li><a href="$homeRoute">$home</a></li>
                        <li><a href="$adminMusicRoute">$adminMusic</a></li>
                        <li><a id="logout">$logout</a></li>
                    </ul>
                </header>
            HTML;
    } else {
        return
            <<<HTML
                <header>
                    <ul>
                        <li><a href="$homeRoute">$home</a></li>       
                        <li><a href="$cartRoute">$cart</a></li>   
                        <li><a href="$adminLoginRoute">$admin</a></li>
                        <li><a href="$userLoginRoute">$user</a></li>
                        <li><a href="$signupRoute">$signup</a></li>
                    </ul>
                </header>
            HTML;
    }
}
