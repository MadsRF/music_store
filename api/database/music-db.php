<?php
// includes the environment variables 
include_once __DIR__ . '/../env/env.php';

class MusicDB
{
  protected $db;

  // https://www.w3schools.com/php/php_oop_constructor.asp
  public function __construct()
  {
    $this->db = $this->connectDB();
  }

  // https://www.w3schools.com/php/php_oop_destructor.asp
  public function __destruct()
  {
    $this->db = null;
  }

  public function dbDisconnect()
  {
    $this->db = null;
  }

  /*-----------------------------------------------------------------*/
  // CONNECT TO DB
  /*-----------------------------------------------------------------*/

  public function connectDB()
  {
    // getting env variable from env file
    $host = ENV::$DB_HOST;
    $port = ENV::$DB_PORT;
    $db = ENV::$MUSIC_DB;
    $charset = ENV::$DB_CHARSET;

    $user = ENV::$DB_USER;
    $pwd = ENV::$DB_PWD;

    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
    $options = [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false
    ];

    try {
      // from Arturo API assignment. connects to database.
      $pdo = new PDO($dsn, $user, $pwd, $options);
    } catch (\PDOException $e) {
      echo $e->getMessage();
      return;
    }
    return $pdo;
  }

  /*-----------------------------------------------------------------*/
  // CRUD OPERATIONS
  /*-----------------------------------------------------------------*/

  public function create(string $query, array $params): bool
  {
    try {
      $stmt = $this->db->prepare($query);
      return $stmt->execute($params);
    } catch (Exception $e) {
      echo "ERROR fetching: \n$e";
      return false;
    } finally {
      $this->dbDisconnect();
    }
  }

  public function getOne(string $query, array $params = null, bool $reuse_params = false)
  {
    try {
      if ($params) {
        if ($reuse_params) $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        $results = $stmt->fetch();
        return $results;
      } else {

        $stmt = $this->db->query($query);
        $results = $stmt->fetch();
        return $results;
      }
    } catch (Exception $e) {
      echo "ERROR fetching: \n$e";
    } finally {
      if ($reuse_params) $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      $this->dbDisconnect();
    }
  }

  public function getAll(string $query, array $params = null, bool $reuse_params = false)
  {
    try {
      if ($params) {
        if ($reuse_params) $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        $results = $stmt->fetchAll();
        return $results;
      } else {

        $stmt = $this->db->query($query);
        $results = $stmt->fetchAll();
        return $results;
      }
    } catch (Exception $e) {
      echo "ERROR fetching: \n$e";
    } finally {
      if ($reuse_params) $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      $this->dbDisconnect();
    }
  }


  public function update(string $query, array $params)
  {
    try {
      $stmt = $this->db->prepare($query);
      return $stmt->execute($params);
    } catch (Exception $e) {
      echo "ERROR fetching: \n$e";
    } finally {
      $this->dbDisconnect();
    }
  }

  public function delete(string $query, array $params)
  {
    try {
      $stmt = $this->db->prepare($query);
      $stmt->execute($params);
      $deleted = $stmt->rowCount();
      return $deleted;
    } catch (Exception $e) {
      echo "ERROR fetching: \n$e";
    } finally {
      $this->dbDisconnect();
    }
  }
}
