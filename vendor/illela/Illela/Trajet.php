<?php
namespace Illela;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class Trajet
{
	
	public function index(Request $request, Application $app)
	{
		
		
		return new JsonResponse('{"name" : "test"}', 200);
	}
}
