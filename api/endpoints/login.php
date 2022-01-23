<?php
session_start();
include_once __DIR__ . '/endpoint.php';
include_once __DIR__ . '/../handlers/url.php';

include_once __DIR__ . '/../models/admin.php';
include_once __DIR__ . '/../models/customer.php';

class Login extends Endpoint
{

  private const COLLECTION =  'login';
  private const CUSTOMER = 'customers';
  private const ADMIN = 'admin';

  public function __construct()
  {
    parent::__construct(true);
    $this->handleRequest(false);
  }


  /*-----------------------------------------------------------------*/
  // CRUD ENDPOINTS
  /*-----------------------------------------------------------------*/

  // GET - not allowed since we are dealing with sensitive data
  protected function handleGet()
  {
    return $this->handleNotAllowed();
  }

  protected function handlePost()
  {
    $email = $this->body['username'] ?? null;
    $pass = $this->body['password'] ?? null;

    if (!$email || !$pass) return $this->badRequest();

    // updates id. from php
    session_regenerate_id();

    // if customer
    if ($this->pathParams[$this::COLLECTION] === $this::CUSTOMER) {
      $customer = new Customer();
      $customerInfo = $customer->confirmPasswordCustomer($email, $pass);

      if (!$customerInfo) return $this->noAuthResponse();

      $_SESSION['is_user'] = true;
      $_SESSION['customer_id'] = $customerInfo['CustomerId'];
      $_SESSION['first_name'] = $customerInfo['FirstName'];
      $_SESSION['last_name'] = $customerInfo['LastName'];

      echo json_encode('ok'); // echo ok, else it wont work
      // if admin
    } else if ($this->pathParams[$this::COLLECTION] === $this::ADMIN) {
      $admin = new Admin();
      $isAdmin = $admin->confirmPasswordAdmin($pass);

      if (!$isAdmin) return $this->noAuthResponse();

      $_SESSION['is_admin'] = true;
      $_SESSION['first_name'] = $this::ADMIN;
      echo json_encode('ok'); // echo ok, else it wont work
    } else {
      return $this->notFound();
    }
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
