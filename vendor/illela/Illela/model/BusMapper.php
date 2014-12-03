<?php
namespace Illela\Model;

use Silex\Application;
use Illela\Classes\KeolisApi;

class BusMapper extends KeolisApi {

    public function __construct()
    {
        parent::__construct();
        $this->_setNetwork(self::STAR);
        $this->_setVersion(self::VERSION2);
    }
    public function getLines($station = 'all') {
        return $this->_getResponse('getlines', array('param' => array('size' => 100)));
    }
    
    public function getLineAlert($id = '') {
        return $this->_getResponse(
            'getlinesalerts', array(
                'param' => array(
                    'mode' => 'line',
                    'line' => $id
                )
            )
        );
    }
    
    
}