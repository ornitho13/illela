<?php

namespace Illela\Controller;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illela\Model\BusMapper;

class Bus {
    
    private $_busMapper = null;
    private $_request = null;
    public function __construct()
    {
        $this->_busMapper = new BusMapper();
    }
    
    public function index(Request $request)
    {
    
        $response = new Response();
        $response->setContent($this->_busMapper->getLines());
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
        //return $this->_veloMapper->getBikeStations($request);
    }
    
    public function alert($id, Request $request)
    {
        $response = new Response();
        $response->setContent($this->_busMapper->getLineAlert($id));
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
        //return $this->_veloMapper->getBikeStations($request);
    }
}