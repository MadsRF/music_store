<?php

include_once __DIR__ . '/../database/music-db.php';

class Admin extends MusicDB {

  function confirmPasswordAdmin(string $password){
    $query = <<<SQL
      SELECT * from `admin`;
    SQL;

    $admin = $this->getOne($query);
    
    // password_verify from php
    $result = password_verify($password, $admin['Password']);

    return $result;
  }
}