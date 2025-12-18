<?php
//Start session and destroy all session data to log out user
session_start();
session_unset();
session_destroy();
header('Location: ../index.php');
exit;
