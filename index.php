<?php
include_once __DIR__ . '/env.php';

// Initializing the static class with environment variables
Env::setEnvironment();

// Starts the session for the user and sets SESSION variables when logging in.
session_start();

function getUrl($index_root = __DIR__)
{
  $url = strtok($_SERVER['REQUEST_URI'], '?'); // Get url without parameters
  $url = rtrim($url, '/'); // Exclude the trailing slash from basedir if present
  $url = substr($url, strpos($url, basename($index_root))); // Remove everything in the url which comes before the basedir
  $urlPieces = explode('/', urldecode($url)); // Split the array by '/'
  return $urlPieces;
}

$url = getUrl(__DIR__);

if (count($url) === 1) {
  array_push($url, 'home');
}

switch ([$url[1], $url[2] ?? null]) {
  case ['home', null]:
    include_once __DIR__ . '/public/home/home.php';
    break;

  case ['login', 'user']:
    include_once __DIR__ . '/public/login/user.php';
    break;

  case ['login', 'admin']:
    include_once __DIR__ . '/public/login/admin.php';
    break;

  case ['sign-up', null]:
    include_once __DIR__ . '/public/sign-up/sign-up.php';
    break;

  case ['user-info', null]:
    include_once __DIR__ . '/public/user-info/user-info.php';
    break;

  case ['cart', null]:
    include_once __DIR__ . '/public/cart/cart.php';
    break;

  case ['checkout', null]:
    include_once __DIR__ . '/public/checkout/checkout.php';
    break;

  case ['admin-music', null]:
    include_once __DIR__ . '/public/admin-music/admin-music.php';
    break;

  default:
    echo 'SOMETHING WENT WRONG. CHECK IF URL IS CORRECT';
    break;
}
