<?php

include_once __DIR__ . '/../database/music-db.php';

class Artist extends MusicDB
{
  public function __construct()
  {
    parent::__construct();
  }

  /*-----------------------------------------------------------------*/
  // CRUD QUERIES
  /*-----------------------------------------------------------------*/

  // CREATE
  public function createArtist($artist)
  {
    $query = <<< SQL
      INSERT INTO `artist` (`Name`)
      VALUES (:Name)
    SQL;

    $results = $this->create($query, $artist);
    return $results;
  }

 // READ - Get all
  public function getArtists()
  {
    $query = <<< SQL
      SELECT * FROM artist
    SQL;

    $results = $this->getAll($query);
    return $results;
  }

   // READ - Get one
  public function getArtist($id)
  {
    $query = <<< SQL
      SELECT * FROM artist WHERE ArtistId = :id
    SQL;
    $params = ['id' => $id];

    $result = $this->getOne($query, $params);

    return $result;
  }

  // UPDATE
  public function updateArtist($artist)
  {
    $query = <<< SQL
      UPDATE `artist`
      SET `Name` = :Name
      WHERE `ArtistId` = :ArtistId
    SQL;

    $results = $this->update($query, $artist);
    return $results;
  }

  // DELETE
  public function deleteArtist($id)
  {
    $query = <<< SQL
      DELETE FROM `artist` WHERE `ArtistId` = :id
    SQL;

    $params = ['id' => $id];
    $results = $this->delete($query, $params);
    return $results;
  }
}
