<?php
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../models/search.php';

class Searches extends Endpoint
{

  private $search;

  public function __construct()
  {
    parent::__construct(true);
    $this->search = new Search();
    $this->handleRequest(false);
  }

  /*-----------------------------------------------------------------*/
  // CRUD ENDPOINTS
  /*-----------------------------------------------------------------*/

  // READ
  protected function handleGet()
  {
    // Get all from artist, album and tracks tables EX: .../search/?val=
    if ($this->collectionQuery()) {
      $searchVal = $this->queryParams['val'] ?? null;

      if ($searchVal) {
        $results = $this->search->search($searchVal);
        echo json_encode($results);
        return;
      } else {
        return $this->badRequest();
      }
    }
    return $this->notFound();
  }

  protected function handlePost()
  {
    return $this->handleNotAllowed();
  }

  protected function handlePut()
  {
    return $this->handleNotAllowed();
  }

  protected function handleDelete()
  {
    return $this->handleNotAllowed();
  }
}
