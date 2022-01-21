<?php
// ENDPOINTS
include_once __DIR__ . '/endpoints/albums.php';
include_once __DIR__ . '/endpoints/artists.php';
include_once __DIR__ . '/endpoints/tracks.php';
include_once __DIR__ . '/endpoints/invoices.php';
include_once __DIR__ . '/endpoints/customers.php';
include_once __DIR__ . '/endpoints/searches.php';
include_once __DIR__ . '/endpoints/login.php';

// OTHER
include_once __DIR__ . '/env/env.php';
include_once __DIR__ . '/handlers/url.php';

// Initializing the static class with environment variables
Env::setEnvironment(__DIR__);

// Sets the headers of the responses. only allow json
header('Content-Type: application/json');
header('Accept-version: v1');

$url = getUrl();

// Router
switch ($url[1]) {
    case 'searches':
        new Searches();
        break;
    case 'login':
        new Login();
        break;
    case 'logout':
        session_destroy();
        echo json_encode('ok');
        break;
    case 'albums':
        new Albums();
        break;
    case 'artists':
        new Artists();
        break;
    case 'tracks':
        new Tracks();
        break;
    case 'invoices':
        new Invoices();
        break;
    case 'customers':
        new Customers();
        break;
    default:
        echo 'NO ENDPOINT FOUND - CHECK IF ENDPOINT IS CORRECT',  '<br>';
}
