<?php

include_once __DIR__ . '/../database/music-db.php';

class Customer extends MusicDB
{
  public function __construct()
  {
    parent::__construct();
  }

  /*-----------------------------------------------------------------*/
  // CRUD QUERIES
  /*-----------------------------------------------------------------*/

  // CREATE
  public function createCustomer($customer)
  {
    $customer['Password'] = password_hash($customer['Password'], PASSWORD_DEFAULT);
    $query = <<< SQL
      INSERT INTO `customer` (
        `FirstName`, `LastName`, `Password`, `Company`, `Address`, `City`,
        `State`, `Country`, `PostalCode`, `Phone`, `Fax`, `Email`)
      VALUES ( 
        :FirstName, :LastName, :Password, :Company, :Address, :City,
        :State, :Country, :PostalCode, :Phone, :Fax, :Email);
    SQL;

    $results = $this->create($query, $customer);
    return $results;
  }

  // READ - one
  function getCustomer(int $id)
  {
    $query = <<< SQL
      SELECT CustomerId, FirstName, LastName, Company, Address, City, 
        State, Country, PostalCode, Phone, Fax, Email
      FROM customer
      WHERE CustomerId = :id
    SQL;

    $params = ['id' => $id];
    $results = $this->getOne($query, $params);
    return $results;
  }

  // UPDATE
  public function updateCustomer($customer)
  {

    $query = <<< SQL
      UPDATE `customer`
      SET
      `FirstName` = :FirstName,
      `LastName` = :LastName,
      `Company` = :Company,
      `Address` = :Address,
      `City` = :City,
      `State` = :State,
      `Country` = :Country,
      `PostalCode` = :PostalCode,
      `Phone` = :Phone,
      `Fax` = :Fax,
      `Email` = :Email
      WHERE `CustomerId` = :CustomerId;
    SQL;

    $results = $this->update($query, $customer);
    return $results;
  }

  /*-----------------------------------------------------------------*/
  // FUNCTIONS
  /*-----------------------------------------------------------------*/

  function confirmPasswordCustomer($email, $password)
  {
    $query = <<<SQL
      SELECT CustomerId, Password, FirstName, LastName FROM customer WHERE `Email` = :email;
    SQL;

    $params = ['email' => $email];
    $customer = $this->getOne($query, $params);

    if (!$customer) {
      echo 'Customer not found';
      return;
    }

    $result = password_verify($password, $customer['Password']);

    return $result ? $customer : null;
  }
}
