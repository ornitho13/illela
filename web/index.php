<?php
require_once __DIR__.'/../vendor/autoload.php';

use Illela\Controller\Velo;

define('__KEOLIS_API_URL__', 'http://data.keolis-rennes.com/');
define('__KEOLIS_API_KEY__', '5V2C9RF6SF9GW49');

$app = new Silex\Application();
$app['debug'] = true;

$app->get('/trajet', 'Illela\\Trajet::index');
$app->get('/velo', 'Illela\\Controller\\Velo::index');
$app->match('/velo/{commande}/{id}', function($commande = 'getbikestations', $id='') {
    $veloController = new Velo();
    switch($commande) {
        case 'getbikestations';
            return $veloController->bikeStations($id);
            break;
        default :
            return $veloController->index();
            break;
    }
    
});

$app->run();
