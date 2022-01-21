<?php
include_once __DIR__ . '/../database/music-db.php';

class Invoice extends MusicDB
{
  public function __construct()
  {
    parent::__construct();
  }

  /*-----------------------------------------------------------------*/
  // CRUD QUERIES
  /*-----------------------------------------------------------------*/

  // CREATE
  function createInvoice(array $data): mixed
  {
    $ids = is_string($data['trackIds']) ? $data['trackIds'] : implode(',', $data['trackIds']);

    // REGEX expression to check for id's
    if (!preg_match('/^[0-9]+(,[0-9]+)*$/', $ids)) {
      echo "Id's not recognized";
      return null;
    }

    try {
      // beginTransaction from php - instance are not committed until you end the transaction
      $this->db->beginTransaction();

      $sumPriceQuery = <<< SQL
        SELECT SUM(UnitPrice) as sum FROM track WHERE TrackId IN($ids)
      SQL;

      $tracksSumPrice = $this->getOne($sumPriceQuery)['sum'];

      $invoiceQuery = <<< SQL
        INSERT INTO invoice
          (CustomerId, InvoiceDate, BillingAddress, BillingCity,
            BillingState, BillingCountry, BillingPostalCode, Total)
        VALUES
        (:customer_id, NOW(), :address, :city, :state, :country, :postal_code, :total);
        SQL;

      $params = [
        'customer_id' => $data['customerId'],
        'address' => $data['address'],
        'city' => $data['city'],
        'state' => $data['state'],
        'country' => $data['country'],
        'postal_code' => $data['postalCode'],
        'total' => $tracksSumPrice
      ];

      $this->create($invoiceQuery, $params);

      $invoice_id = $this->db->lastInsertId();

      $invoice_line_query = <<<SQL
        INSERT INTO invoiceline (InvoiceId, TrackId, UnitPrice, Quantity)
        SELECT :invoice_id, track.trackId, track.UnitPrice, 1
        FROM track
        WHERE track.TrackId in ($ids);
        SQL;

      $params = ['invoice_id' => $invoice_id];

      $this->create($invoice_line_query, $params);
      $this->db->commit();
    } catch (Exception $e) {
      return $this->db->rollBack();
    }
    return ['invoice_id' => $invoice_id];
  }

  // READ
  function getInvoice(string $invoice_id)
  {
    $query = <<<SQL
      SELECT invoice.InvoiceId, invoice.InvoiceDate, invoice.BillingAddress, invoice.BillingCity, 
        invoice.BillingState, invoice.BillingCountry, invoice.BillingPostalCode, invoice.Total,
          CONCAT(customer.FirstName, ' ', customer.LastName) AS CustomerName, track.Name AS TrackName, track.UnitPrice
      FROM invoice
      JOIN invoiceline USING(InvoiceId)
      JOIN track USING(TrackId)
      JOIN customer USING(CustomerId)
      WHERE InvoiceId = :id
      SQL;

    $params = ['id' => $invoice_id];

    if (!isset($_SESSION['is_admin'])) {
      $query .= ' AND customer.CustomerId = :customer_id';
      $params['customer_id'] = $_SESSION['customer_id'];
    }

    $results = $this->getAll($query, $params);

    if (count($results) < 1) {
      echo "NO INVOICES FOUND";
      return;
    };

    $invoiceInfo = $results[0];
    unset($invoiceInfo['TrackName'], $invoiceInfo['UnitPrice']);

    $tracks = array_map(function ($result) {
      return [
        'TrackName' => $result['TrackName'],
        'UnitPrice' => $result['UnitPrice']
      ];
    }, $results);

    return ['invoiceInfo' => $invoiceInfo, 'tracks' => $tracks];
  }
}
