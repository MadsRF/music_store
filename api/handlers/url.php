<?php

function getUrl(bool $remove_first_element = false): array
{

  $url = strtok($_SERVER['REQUEST_URI'], "?");   // Get url without parameters
  $url = rtrim($url, '/'); // Exclude the trailing slash from basedir if present
  $url = substr($url, strpos($url, basename(ENV::$INDEX_DIR))); // Remove everything in the url which comes before the basedir
  $url_pieces = explode('/', urldecode($url));  // Split the array by '/'

  if ($remove_first_element) {
    array_shift($url_pieces);
  }
    return $url_pieces;
  
}

