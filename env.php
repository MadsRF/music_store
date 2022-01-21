<?php
// if file exists then dev mode else config vars will be set when deployed
$developmentEnv = __DIR__ . '/environment/dev-env.php';
if (file_exists($developmentEnv)) {
  include_once $developmentEnv;
}

class Env
{
  public static $INDEX_DIR;

  public static function setEnvironment()
  {
    static::$INDEX_DIR = getenv('INDEX_DIR'); // change this when changing folders
  }
}
