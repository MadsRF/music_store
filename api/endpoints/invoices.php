<?php
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../models/invoice.php';

class Invoices extends Endpoint
{

  private const COLLECTION =  'invoices';
  private $invoice;

  public function __construct()
  {
    parent::__construct(true);
    $this->invoice = new Invoice();
    $this->handleRequest(true);
  }

  // READ
  protected function handleGet()
  {
    // get all invoices EX: .../invoices/
    if ($this->collectionRequest()) {
      return $this->notFound();
    }

    // Get one invoice EX: .../invoices/{id}/
    if ($this->ResourceRequest()) {
      $invoiceId = intval($this->pathParams[$this::COLLECTION]);
      $result = $this->invoice->getInvoice($invoiceId);
      echo json_encode($result);
      return;
    }
    return $this->notFound();
  }

  // CREATE
  protected function handlePost()
  {
    $customerId = $this->body['customerId'];
    if ($this->customerAllowed($customerId)) {
      $invoiceId = $this->invoice->createInvoice($_POST);
      echo json_encode($invoiceId);
      return;
    }
    return $this->noAuthResponse();
  }

  // UPDATE
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
