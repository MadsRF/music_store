<?php

abstract class Endpoint
{
    protected $urlArray;
    protected $reqMethod;
    protected $queryParams;
    protected $pathParams;
    protected $body;

    protected const GET = 'GET';
    protected const POST = 'POST';
    protected const PUT = 'PUT';
    protected const DELETE = 'DELETE';

    abstract protected function handleGet();
    abstract protected function handlePost();
    abstract protected function handlePut();
    abstract protected function handleDelete();

    public function __construct()
    {
        $this->urlArray = $this->getUrl(true);
        $this->reqMethod = $_SERVER['REQUEST_METHOD'];
        $this->queryParams = $_GET;
        $this->pathParams = $this->getPathParams();
        $this->body = $_POST;
    }

    /*-----------------------------------------------------------------*/
    // REQUEST HANDLER
    /*-----------------------------------------------------------------*/

    protected function handleRequest()
    {
        switch ($this->reqMethod) {
            case $this::GET:
                $this->handleGet();
                break;

            case $this::POST:
                $this->handlePost();
                break;

            case $this::PUT:
                echo 'Same as post but include id';
                $this->handlePut();
                break;

            case $this::DELETE:
                $this->handleDelete();
                break;

            default:
                $this->handleNotAllowed();
        }
    }

    /*-----------------------------------------------------------------*/
    // GENERAL FUNCTIONS
    /*-----------------------------------------------------------------*/

    // Get the params in url as key-value
    protected function getPathParams()
    {
        $params = [];
        $path_param_key = "";

        foreach ($this->urlArray as $index => $path_element) {
            if ($index % 2 === 0 || $index === 0) {
                $path_param_key = $path_element;
                $params[$path_param_key] = null;
            } else {
                $params[$path_param_key] = $path_element;
            }
        }
        return $params;
    }

    function getUrl(bool $remove_first_element = false): array
    {

        $url = strtok($_SERVER['REQUEST_URI'], "?"); // Get url without parameters
        $url = rtrim($url, '/'); // Exclude the trailing slash from basedir if present
        $url = substr($url, strpos($url, basename(ENV::$INDEX_DIR))); // Remove everything in the url which comes before the basedir. Allow the api to be deployed anywhere.
        $url_pieces = explode('/', urldecode($url)); // Split the array by '/'

        if ($remove_first_element) {
            array_shift($url_pieces);
        }
        return $url_pieces;
    }

    // Only customer with certain id or admin is allowed 
    protected function customerAllowed($id)
    {
        $customerId = $_SESSION['customer_id'] ?? null;

        if ($customerId === intval($id) || isset($_SESSION['is_admin'])) {
            return true;
        } else {
            $this->noAuthResponse();
            return false;
        }
    }

    // Check if admin
    protected function adminAllowed()
    {
        if (isset($_SESSION['is_admin'])) {
            return true;
        } else {
            $this->noAuthResponse();
            return false;
        }
    }

    /*-----------------------------------------------------------------*/
    // REQUESTS QUERY
    /*-----------------------------------------------------------------*/

    protected function collectionRequest()
    {
        return count($this->urlArray) === 1 && empty($this->queryParams);
    }

    protected function collectionQuery()
    {
        return count($this->urlArray) === 1 && !empty($this->queryParams);
    }

    protected function ResourceRequest()
    {
        return count($this->urlArray) === 2;
    }

    protected function subCollectionRequest()
    {
        return count($this->urlArray) === 3;
    }

    protected function subResourceRequest()
    {
        return count($this->urlArray) === 4;
    }

    /*-----------------------------------------------------------------*/
    // REQUESTS HTTP RESPONSE
    /*-----------------------------------------------------------------*/

    protected function goodRequest()
    {
        return http_response_code(200);
    }

    protected function badRequest()
    {
        return http_response_code(400);
    }

    protected function noAuthResponse()
    {
        return http_response_code(401);
    }

    protected function notFound()
    {
        return http_response_code(404);
    }

    protected function handleNotAllowed()
    {
        return http_response_code(405);
    }
}
