<?php
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../handlers/url.php';


class Cart extends Endpoint
{

    public function __construct()
    {
        parent::__construct();

        $this->handleRequest();
    }

    protected function handleGet()
    {
        echo json_encode($_SESSION['cart']);
    }

    // CREATE AND UPDATE
    protected function handlePost()
    {
        $trackId = $this->body['trackId'] ?? null;

        // sets array first time so it doesn't overwrite
        if (!is_array($_SESSION['cart'])) {
            $_SESSION['cart'] = array();
        };
        array_push($_SESSION['cart'], $trackId);
        echo json_encode($_SESSION['cart']);
    }

    protected function handlePut()
    {
        return $this->handleNotAllowed();
    }

    // DELETE
    protected function handleDelete()
    {
        return $this->handleNotAllowed();
    }
}
