<?php

namespace Illela\Controller;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illela\Model\VeloMapper;
use Symfony\Component\HttpFoundation\Response;

class Velo {
    
    private $_veloMapper = null;
    private $_request = null;
    public function __construct()
    {
        $this->_veloMapper = new VeloMapper();
    }
    
    public function index(Request $request)
    {
    
        return $this->_veloMapper->getBikeStations($request);
    }
    
    public function bikeStations(Request $request, $id = '')
    {
        $response = new Response();
        $response->setContent($this->_veloMapper->getBikeStationsById($id));
        $response->setStatusCode(200);
        if(!empty($id)) {
            $response->setMaxAge(60);
        } else {
            $response->setMaxAge(300);
        }
        $response->headers->addCacheControlDirective('must-revalidate', true);
        $response->prepare($request);
        if ($response->isNotModified($request)) {
        }
        //$response = $response->send();
        return $response;
    }
    
}