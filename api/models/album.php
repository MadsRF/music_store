<?php

include_once __DIR__ . '/../database/music-db.php';

class Album extends MusicDB
{
  public function __construct()
  {
    parent::__construct();
  }

  /*-----------------------------------------------------------------*/
  // CRUD QUERIES
  /*-----------------------------------------------------------------*/

  // CREATE
  public function createAlbum($album)
  {
    $query = <<< SQL
      INSERT INTO `album` (`Title`, `ArtistId`)
      VALUES (:Title, :ArtistId)
    SQL;

    $results = $this->create($query, $album);
    return $results;
  }


  // READ - Get all
  public function getAlbums(string $artistId = null)
  {
    $query = <<< SQL
      SELECT * FROM album 
    SQL;

    if (!is_null($artistId)) {
      $query .= ' WHERE ArtistId = :id';
      $results = $this->getAll($query, ['id' => $artistId]);
      return $results;
    } else {
      $results = $this->getAll($query);
      return $results;
    }
  }

  // READ - Get one
  public function getAlbum(string $albumId)
  {
    $query = <<< SQL
        SELECT * FROM album WHERE AlbumId = :id
      SQL;

    $results = $this->getOne($query, ['id' => $albumId]);
    return $results;
  }

  // READ - Get Album with tracks
  public function getAlbumAndTracks($id)
  {
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
      WHERE album.AlbumId = :id;
    SQL;

    $params = ['id' => $id];
    $results['tracks'] = $this->getAll($query, $params);

    $results['album'] = [
      "albumId" => $results['tracks'][0]['albumName'],
      "albumName" => $results['tracks'][0]['albumName'],
      "artistId" => $results['tracks'][0]['artistId'],
      "artistName" => $results['tracks'][0]['albumName'],
    ];

    $results['tracks'] = array_map(function ($result) {

      return [
        "trackId" => $result['trackId'],
        "trackTitle" => $result['trackTitle']
      ];
    }, $results['tracks']);

    return $results;
  }


  // UPDATE
  public function updateAlbum($album)
  {
    $query = <<< SQL
      UPDATE `album`
      SET `Title` = :Title, `ArtistId` = :ArtistId
      WHERE `AlbumId` = :AlbumId
    SQL;

    $results = $this->update($query, $album);
    return $results;
  }

  // DELETE
  public function deleteAlbum($id)
  {
    $query = <<< SQL
          DELETE FROM `album` WHERE `AlbumId` = :id
    SQL;

    $params = ['id' => $id];
    $results = $this->delete($query, $params);
    return $results;
  }
}
