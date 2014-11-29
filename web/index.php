<?php
require_once __DIR__.'/../vendor/autoload.php';

use Illela\Controller\Velo;
use Symfony\Component\HttpFoundation\Request;

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

$app['http_cache']->run();
