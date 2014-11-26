<?php

namespace Illela\Controller;

use Symfony\Component\HttpFoundation\Request;
use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illela\Model\VeloMapper;
use Symfony\Component\HttpFoundation\Response;

class Velo {
    
    private $_veloMapper = null;
    public function __construct()
    {
        $this->_veloMapper = new VeloMapper();
    }
    
    public function index()
    {
    
        return new Response($this->_veloMapper->getBikeStations(), 200);
    }
    
    public function bikeStations($id = '')
    {
        return new Response($this->_veloMapper->getBikeStationsById($id), 200);
    }
    
}