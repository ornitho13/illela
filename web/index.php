<?php
require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\JsonResponse;

$app = new Silex\Application();
$app['debug'] = true;



//$app->register(new Silex\Provider\ServiceControllerServiceProvider());

$app->get('/', function() {
	return 'Hello!';
});

$app->get('/trajet', 'Illela\\Trajet::index');

$app->run();
