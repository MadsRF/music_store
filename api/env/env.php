<?php
// if file exists then dev mode else config vars will be set when deployed
$developmentEnv = __DIR__ . '/../../environment/dev-env.php';
if (file_exists($developmentEnv)) {
  include_once $developmentEnv;
}

class Env
{
  public static $HOST;
  public static $API_KEY;
  public static $MUSIC_DB;
  public static $DB_HOST;
  public static $DB_PORT;
  public static $DB_PWD;
  public static $DB_USER;
  public static $DB_CHARSET;
  public static $INDEX_DIR;

  // gets the environments variables used for when deploying
  public static function setEnvironment(string $index_dir)
  {
    static::$HOST = getenv('HOST');
    static::$API_KEY = getenv('API_KEY');
    static::$DB_HOST = getenv('DB_HOST');
    static::$DB_PORT = getenv('DB_PORT');
    static::$MUSIC_DB = getenv('MUSIC_DB');
    static::$DB_USER = getenv('DB_USER');
    static::$DB_PWD = getenv('DB_PWD');
    static::$DB_CHARSET = getenv('DB_CHARSET');
    static::$INDEX_DIR = $index_dir;
  }
}
