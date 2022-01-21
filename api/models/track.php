<?php
include_once __DIR__ . '/../database/music-db.php';

class Track extends MusicDB
{

  public function __construct()
  {
    parent::__construct();
  }

  /*-----------------------------------------------------------------*/
  // CRUD QUERIES
  /*-----------------------------------------------------------------*/

  // CREATE
  public function createTrack($track)
  {
    $query = <<< SQL
      INSERT INTO `track` (
        `Name`, `AlbumId`, `MediaTypeId`, `GenreId`, 
        `Composer`, `Milliseconds`, `Bytes`, `UnitPrice`)
      VALUES ( 
        :Name, :AlbumId, :MediaTypeId, :GenreId, 
        :Composer, :Milliseconds, :Bytes, :UnitPrice);
    SQL;

    $is_success = $this->create($query, $track);
    return $is_success;
  }

  // READ - get all
  public function getTracks()
  {
    $query = <<< SQL
      SELECT * FROM track LIMIT 5
    SQL;

    $results = $this->getAll($query);
    return $results;
  }

  // READ - get one
  public function getTrack($id)
  {
    $query = <<< SQL
      SELECT track.TrackId AS trackId, track.Name AS trackTitle, 
        track.Composer AS trackComposer, track.Milliseconds AS trackTime, 
        track.Bytes AS trackSize, track.UnitPrice AS trackPrice, 
        genre.GenreId as trackGenreId, genre.name AS trackGenre, 
        mediatype.MediaTypeId as trackMediaTypeId, mediatype.Name AS trackMediaType,
        album.AlbumId AS albumId, album.Title AS albumName, 
        artist.ArtistId AS artistId, artist.Name AS artistName
      FROM track
      JOIN album USING(AlbumId)
      JOIN artist USING(ArtistId)
      JOIN genre USING(GenreId)
      JOIN mediatype USING(MediaTypeId)
      WHERE Trackid = :id
    SQL;

    $param = ['id' => $id];
    $result = $this->getOne($query, $param);
    return $result;
  }

  // READ - get list of tracks by specified id
  public function getSpecificTracks($ids)
  {
    
    if (!preg_match('/^[0-9]+(,[0-9]+)*$/', $ids)) {
      echo "No track found with that id. Only id allowed";
      return;
    }

    $query = <<< SQL
      SELECT track.TrackId AS trackId, track.Name AS trackTitle, 
        track.Composer AS trackComposer, track.Milliseconds AS trackTime, 
        track.Bytes AS trackSize, track.UnitPrice AS trackPrice, 
        genre.name AS trackGenre, mediatype.Name AS trackMediaType,
        album.AlbumId AS albumId, album.Title AS albumName, 
        artist.ArtistId AS artistId, artist.Name AS artistName
      FROM track
      JOIN album USING(AlbumId)
      JOIN artist USING(ArtistId)
      JOIN genre USING(GenreId)
      JOIN mediatype USING(MediaTypeId)
      WHERE Trackid in ($ids)
    SQL;

    $results = $this->getAll($query);
    return $results;
  }

  // UPDATE
  public function updateTrack($track)
  {
    $query = <<< SQL
      UPDATE `track`
      SET `Name` = :Name, `AlbumId` = :AlbumId, `MediaTypeId` = :MediaTypeId, `GenreId` = :GenreId, 
        `Composer` = :Composer, `Milliseconds` = :Milliseconds, `Bytes` = :Bytes, `UnitPrice` = :UnitPrice
      WHERE `TrackId` = :TrackId;
    SQL;

    $is_success = $this->update($query, $track);
    return $is_success;
  }

  // DELETE
  public function deleteTrack($id)
  {
    $query = <<< SQL
      DELETE FROM `track` WHERE Trackid = :id
    SQL;

    $params = ['id' => $id];
    $is_success = $this->delete($query, $params);
    return $is_success;
  }
}
