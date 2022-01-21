<?php
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../handlers/url.php';
include_once __DIR__ . '/../models/album.php';

class Albums extends Endpoint
{

  private const COLLECTION =  'albums';
  private $album;

  public function __construct()
  {
    parent::__construct();
    $this->album = new Album();
    $this->handleRequest();
  }

  /*-----------------------------------------------------------------*/
  // CRUD ENDPOINTS
  /*-----------------------------------------------------------------*/

  // READ
  protected function handleGet()
  {
    // Get all albums EX: .../albums/
    if ($this->collectionRequest()) {
      $results = $this->album->getAlbums();
      echo json_encode($results);
      return;
    }

    // Get one album EX: .../albums/{id}/
    if ($this->ResourceRequest()) {
      $albumId = intval($this->pathParams[$this::COLLECTION]);
      $result = $this->album->getAlbum($albumId);
      echo json_encode($result);
      return;
    }

    // Get all albums from artist EX: .../albums/?artistId=
    if ($this->collectionQuery()) {
      $artistId = $this->queryParams['artistId'] ?? null;

      if ($artistId) {
        $results = $this->album->getAlbums($artistId);
        echo json_encode($results);
        return;
      } else {
        return $this->badRequest();
      }
    }
    // Get album with tracks EX: .../albums/{id}/tracks
    if ($this->subCollectionRequest()) {
      $albumId = intval($this->pathParams[$this::COLLECTION]);
      $result = $this->album->getAlbumAndTracks($albumId);
      echo json_encode($result);
      return;
    }
    return $this->notFound();
  }

  // CREATE AND UPDATE
  protected function handlePost()
  {
    if (!$this->adminAllowed()) return;

    $putRequest = isset($this->body['AlbumId']);

    if ($putRequest) {
      $results = $this->album->updateAlbum($this->body);
    } else {
      $results = $this->album->createAlbum($this->body);
    }

    echo json_encode($results);
    return;
  }

  protected function handlePut()
  {
    return $this->handleNotAllowed();
  }

  // DELETE
  protected function handleDelete()
  {
    $albumId = intval($this->pathParams[$this::COLLECTION]);
    $results = $this->album->deleteAlbum($albumId);
    echo $results;
    return;
  }
}
