<?php

namespace Illela\Controller;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illela\Model\MetroMapper;
use Symfony\Component\HttpFoundation\Response;

class Metro {
    
    private $_metroMapper = null;
    private $_request = null;
    public function __construct()
    {
        $this->_metroMapper = new MetroMapper();
    }
    
    public function index(Request $request)
    {
    
        return $this->_metroMapper->getStations($request);
    }
    
    public function stations(Request $request)
    {
        $response = new Response();
        $metroContent = $this->_metroMapper->getStations();
        $response->setContent($metroContent);
        $response->setStatusCode(200);
        $response->setMaxAge(300);
        $response->headers->addCacheControlDirective('must-revalidate', true);
        $response->prepare($request);
        if ($response->isNotModified($request)) {
        }
        return $response;
    }
    
    public function stationById(Request $request, $id)
    {
    
        $response = new Response();
        $metroContent = $this->_metroMapper->getStationById($id);
        $response->setContent($metroContent);
        $response->setStatusCode(200);
        $response->setMaxAge(60);
        $response->headers->addCacheControlDirective('must-revalidate', true);
        $response->prepare($request);
        return $response;
    }
    
    public function stationsByProximity(Request $request, $params = null, $id='')
    {
        $response = new Response();
        $metroContent = $this->_metroMapper->getStationsByProximity($params, $id);
        $response->setContent($metroContent);
        $response->setStatusCode(200);
        if(!empty($id)) {
            $response->setMaxAge(60);
        } else {
            $response->setMaxAge(300);
        }
        $response->headers->addCacheControlDirective('must-revalidate', true);
        $response->prepare($request);
        return $response;
    }
    
    public function nextDeparturesById(Request $request, $params = null, $id = '')
    {
        $response = new Response();
        $metroContent = $this->_metroMapper->getNextDeparturesById($id, $params);
        $response->setContent($metroContent);
        $response->setStatusCode(200);
        if(!empty($id)) {
            $response->setMaxAge(60);
        } else {
            $response->setMaxAge(300);
        }
        $response->headers->addCacheControlDirective('must-revalidate', true);
        $response->prepare($request);
        return $response;
    }
    
    public function nextDeparturesByProximity(Request $request, $params = null)
    {
        $response = new Response();
        $metroContent = $this->_metroMapper->getNextDeparturesByProximity($params);
        $response->setContent($metroContent);
        $response->setStatusCode(200);
        if(!empty($id)) {
            $response->setMaxAge(60);
        } else {
            $response->setMaxAge(300);
        }
        $response->headers->addCacheControlDirective('must-revalidate', true);
        $response->prepare($request);
        return $response;
    }
    
    
}