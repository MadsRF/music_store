<?php
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../handlers/url.php';
include_once __DIR__ . '/../models/track.php';

class Tracks extends Endpoint
{

  private const COLLECTION =  'tracks';
  private $track;

  public function __construct()
  {
    parent::__construct(false);
    $this->track = new Track();
    $this->handleRequest(false);
  }

  /*-----------------------------------------------------------------*/
  // CRUD ENDPOINTS
  /*-----------------------------------------------------------------*/

  // READ
  protected function handleGet()
  {
    // Get all tracks EX: .../tracks/
    if ($this->collectionRequest()) {
      $results = $this->track->getTracks();
      echo json_encode($results);
      return;
    }

    // Get one track EX: .../tracks/{id}/
    if ($this->ResourceRequest()) {
      $track_id = intval($this->pathParams[$this::COLLECTION]);
      $result = $this->track->getTrack($track_id);
      echo json_encode($result);
      return;
    }

    // Get specific row of tracks EX: .../tracks/?id=1,2,3,4
    if ($this->collectionQuery()) {
      $ids = $this->queryParams['id'] ?? null;

      if (isset($ids)) {
        $results = $this->track->getSpecificTracks($ids);
        echo json_encode($results);
        return;
      } else {
        return $this->badRequest();
      }
    }
    return $this->notFound();
  }

  // CREATE AND UPDATE
  protected function handlePost()
  {
    if (!$this->adminAllowed()) return;
    $putRequest = isset($this->body['TrackId']);

    if ($putRequest) {
      $results = $this->track->updateTrack($this->body);
    } else {
      $results = $this->track->createTrack($this->body);
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
    $track_id = intval($this->pathParams[$this::COLLECTION]);
    $results = $this->track->deleteTrack($track_id);
    echo $results;
    return;
  }
}
