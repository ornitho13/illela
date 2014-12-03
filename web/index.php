<?php
require_once __DIR__.'/../vendor/autoload.php';

use Illela\Controller\Velo;
use Symfony\Component\HttpFoundation\Request;
use Illela\Controller\Metro;
use Illela\Controller\Bus;

define('__KEOLIS_API_URL__', 'http://data.keolis-rennes.com/');
define('__KEOLIS_API_KEY__', '5V2C9RF6SF9GW49');

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\HttpCacheServiceProvider(), array(
    'http_cache.cache_dir' => __DIR__.'/cache/',
));

$app->get('/velo', 'Illela\\Controller\\Velo::index');
$app->get('/velo/{id}', function($id='', Request $request) {
    $veloController = new Velo();
    return $veloController->bikeStations($request, $id);
});

$app->get('/metro', function(Request $request) {
    $param = $_GET;
    $metroController = new Metro();
    return $metroController->index($request);
});

$app->get('/metro/proximity', function(Request $request) {
    $param = $_GET;
    $metroController = new Metro();
    return $metroController->stationsByProximity($request, $param);
});
$app->get('/metro/proximity/{id}', function($id='', Request $request) {
    $param = $_GET;
    $metroController = new Metro();
    return $metroController->stationsByProximity($request, $param, $id);
});
$app->get('/metro/nextdepartures/{id}', function($id='', Request $request) {
    $param = $_GET;
    $metroController = new Metro();
    return $metroController->nextDeparturesById($request, null,$id);
});
$app->get('/metro/nextdepartures/proximity', function(Request $request) {
    $param = $_GET;
    $metroController = new Metro();
    return $metroController->nextDeparturesByProximity($request,$param);
});
$app->get('/metro/{id}', function($id='', Request $request) {
    $param = $_GET;
    $metroController = new Metro();
    return $metroController->stationById($request, $id);
});
$app->get('/bus', function( Request $request) {
    $param = $_GET;
    $busController = new Bus();
    return $busController->index($request);
});
$app->get('/bus/alert/{id}', function($id='', Request $request) {
    $param = $_GET;
    $busController = new Bus();
    return $busController->alert($id, $request);
});
$app['http_cache']->run();
