<?php
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../handlers/url.php';
include_once __DIR__ . '/../models/customer.php';

class Customers extends Endpoint
{

  private const COLLECTION =  'customers';
  private const SUBCOLLECTION = 'invoices';
  private $customer;

  public function __construct()
  {
    parent::__construct();
    $this->customer = new Customer();
    $this->handleRequest();
  }

  /*-----------------------------------------------------------------*/
  // CRUD ENDPOINTS
  /*-----------------------------------------------------------------*/

  // READ
  protected function handleGet()
  {
    // Get all customers/
    if ($this->collectionRequest()) {
      return $this->notFound();
    }

    // Get customer SESSION id EX: .../customers/?id=current/
    if ($this->collectionQuery()) {
      $request = $this->queryParams['id'] ?? null;

      if ($request === 'current') {
        $customerId = $_SESSION['customer_id'];
        $results = $this->customer->getCustomer($customerId);
        echo json_encode($results);
        return;
      }
    }

    // Get one customer EX: .../customers/{id}/
    if ($this->ResourceRequest()) {
      $customerId = intval($this->pathParams[$this::COLLECTION]);

      if ($this->customerAllowed($customerId)) {
        $results = $this->customer->getCustomer($customerId);
        echo json_encode($results);
        return;
      }
      return $this->noAuthResponse();
    }

    // Get customer invoice EX: .../customers/{id}/invoices/{id}/
    if ($this->subResourceRequest()) {
      $invoice = new Invoice();
      $invoiceId = $this->pathParams[$this::SUBCOLLECTION];
      $customerId = intval($this->pathParams[$this::COLLECTION]);

      if ($this->customerAllowed($customerId)) {
        $results = $invoice->getInvoice($invoiceId);
        echo json_encode($results);
        return;
      }
      return $this->noAuthResponse();
    }
    return $this->notFound();
  }

  // CREATE AND UPDATE
  protected function handlePost()
  {
    $customerId = $this->body['CustomerId'] ?? null;
    $putRequest = isset($customerId);

    if ($putRequest) {
      if ($this->customerAllowed($customerId)) {
        $results = $this->customer->updateCustomer($this->body);
      }
    } else {
      $results = $this->customer->createCustomer($this->body);
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
    return $this->handleNotAllowed();
  }
}
