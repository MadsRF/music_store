<?php

use PHPUnit\Framework\TestCase;

include_once __DIR__ . '/../models/album.php';
include_once __DIR__ . '/../env/env.php';

class AlbumsTest extends TestCase
{

  function setUp(): void
  {
    Env::setEnvironment(__DIR__);
  }

  // Has to start with test in function name, else warning from phpunit
  function testGetAlbumByIdCorrect(): void
  {
    $id = 1;
    $album = new Album();

    $result = $album->getAlbum($id);

    $this->assertEquals($id, $result['AlbumId']);
  }
}
