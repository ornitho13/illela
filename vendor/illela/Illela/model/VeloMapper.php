<?php
namespace Illela\Model;

use Silex\Application;
use Illela\Classes\KeolisApi;

class VeloMapper extends KeolisApi {

    public function __construct()
    {
        parent::__construct();
        $this->_setNetwork(self::LEVELOSTAR);
        $this->_setVersion(self::VERSION2);
    }
    public function getBikeStations($station = 'all') {
        return $this->_getResponse('getbikestations');
    }
    
    public function getBikeStationsById($id) {

        return $this->_getResponse(
            'getbikestations', 
            array(
                'param' => array(
                    'station' => 'number',
                    'value' => $id
                )
            )
        );
    }
}