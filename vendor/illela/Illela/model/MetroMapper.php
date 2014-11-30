<?php
namespace Illela\Model;

use Silex\Application;
use Illela\Classes\KeolisApi;

class MetroMapper extends KeolisApi {

    public function __construct()
    {
        parent::__construct();
        $this->_setNetwork(self::STAR);
        $this->_setVersion(self::VERSION2);
    }
    public function getStations() {
        return $this->_getResponse('getmetrostations');
    }
    
    /**
     * 
     * @param string $id
     * @param string $params
     * @return mixed
     */
    public function getStationsByProximity($params='', $id='')
    {
        //$id = $params['id'];
        $parameters = array();
        if (!empty($id)) {
            $parameters = array(
                'param' => array(
                    'mode' => 'proximity',
                    'type' => 'station',
                    'station' => $id
                )
            );
        } else {
            $parameters = array(
                'param' => array(
                    'mode' => 'proximity',
                    'type' => 'coords',
                    'lat' => $params['lat'],
                    'lng' => $params['long']
                )
            );
        }
        return $this->_getResponse(
            'getmetrostations', 
            $parameters
        );
    }
    /**
     * 
     * @param string $id
     * @return mixed
     */
    public function getStationById($id='')
    {
    
        if (!empty($id)) {
            return $this->_getResponse(
                'getmetrostations',
                array(
                    'param' => array(
                            'mode' => 'station',
                            'station' => $id
                    )
                )
            );
        } else {
            //return all stations
            return $this->_getResponse(
                'getmetrostations'
            );
        }
    }
    /**
     * 
     * @param string $id
     * @param string $params
     * @return mixed
     */
    public function getNextDeparturesByProximity($params = '', $id='')
    {
        $parameters = array();
        if (!empty($id)) {
            $parameters = array(
                'param' => array(
                    'mode' => 'proximity',
                    'type' => 'station',
                    'station' => $id
                )
            );
        } else {
            $parameters = array(
                'param' => array(
                    'mode' => 'proximity',
                    'type' => 'coords',
                    'lat' => $params['lat'],
                    'lng' => $params['long']
                )
            );
        }
        return $this->_getResponse(
                'getmetronextdepartures',
                $parameters
        );
    }
    /**
     * 
     * @param string $id
     * @param string $params
     * @return mixed
     */
    public function getNextDeparturesById($id = '', $params = '')
    {
        if (!empty($id)) {
            $this->_setVersion(self::VERSION22);
            return $this->_getResponse(
                    'getmetronextdepartures',
                    array(
                            'param' => array(
                                    'mode' => 'station',
                                    'station' => $id
                            )
                    )
            );
        }
    }
}