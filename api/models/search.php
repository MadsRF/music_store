<?php

include_once __DIR__ . '/../database/music-db.php';

class Search extends MusicDB
{

  // Get artists, albums, tracks
  public function search(string $search)
  {
    $query = <<< SQL
      SELECT track.TrackId AS 'id', track.Name AS 'trackName', artist.Name AS 'artistName', album.Title AS 'albumName', 'track' AS type 
      FROM track
      JOIN album USING(AlbumId)
      JOIN artist USING(ArtistId) 
      WHERE track.Name LIKE :search
      UNION
      SELECT artist.ArtistId AS 'id', null AS 'trackName', artist.Name AS 'artistName', null AS 'albumName', 'artist' AS type 
      FROM artist 
      WHERE artist.Name LIKE :search
      UNION
      SELECT album.AlbumId AS 'id', null AS 'trackName', artist.Name AS 'artistName', album.Title AS 'albumName', 'album' AS type 
      FROM album 
      JOIN artist USING(ArtistId)
      WHERE album.Title LIKE :search
    SQL;

    $search = "$search%";
    $params = ['search' => $search];

    $resultsQuery = $this->getAll($query, $params, true);

    $resultsFormatted = array(
      'tracks' => array(),
      'artists' => array(),
      'albums' => array()
    );

    foreach ($resultsQuery as $result) {
      if ($result['type'] === 'track') {
        array_push($resultsFormatted['tracks'], $result);
      } else if ($result['type'] === 'artist') {
        array_push($resultsFormatted['artists'], $result);
      } else {
        array_push($resultsFormatted['albums'], $result);
      }
    }
    return $resultsFormatted;
  }
}
