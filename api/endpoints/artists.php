<?php
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../handlers/url.php';
include_once __DIR__ . '/../models/artist.php';

class Artists extends Endpoint
{

  private const COLLECTION =  'artists';
  private $artist;

  public function __construct()
  {
    parent::__construct();
    $this->artist = new Artist();
    $this->handleRequest();
  }

  /*-----------------------------------------------------------------*/
  // CRUD ENDPOINTS
  /*-----------------------------------------------------------------*/

  // READ
  protected function handleGet()
  {
    // Get all EX: .../artists/
    if ($this->collectionRequest()) {
      $results = $this->artist->getArtists();
      echo json_encode($results);
      return;
    }

    // Get one EX: .../artists/{id}/
    if ($this->ResourceRequest()) {
      $artistId = intval($this->pathParams[$this::COLLECTION]);
      $result = $this->artist->getArtist($artistId);
      echo json_encode($result);
      return;
    }

    return $this->notFound();
  }

  // CREATE AND UPDATE
  protected function handlePost()
  {
    if (!$this->adminAllowed()) return;

    $putRequest = isset($this->body['ArtistId']);

    if ($putRequest) {
      $results = $this->artist->updateArtist($this->body);
    } else {
      $results = $this->artist->createArtist($this->body);
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
    if (!$this->adminAllowed()) return;

    $albumId = intval($this->pathParams[$this::COLLECTION]);
    $results = $this->artist->deleteArtist($albumId);
    echo $results;
    return;
  }
}
