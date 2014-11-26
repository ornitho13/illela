<?php
namespace Illela\Classes;

class KeolisApi {
    private $_request = null;
    private $_version = null;
    private $_format = null;
    
    /**
     * version constante
     */
    const VERSION1 = '1.0';
    const VERSION2 = '2.0';
    const VERSION21 = '2.1';
    const VERSION22 = '2.2';
    /**
     * network constante
     */
    const LEVELOSTAR = 'levelostar';
    const STAR = 'star';
    
    /**
     * format constante
     */
    const JSON = 'json';
    const XML = 'xml';
    
    public function __construct()
    {
        $this->_request = __KEOLIS_API_URL__;
        $this->_version = self::VERSION22;
        $this->_network = self::STAR;
        $this->_format = self::JSON;
    }
    
    protected function _setVersion($version)
    {
        $this->_version = $version;
    }
    
    protected function _setNetwork($network)
    {
        $this->_network = $network;
    }
    
    protected function _setFormat($format)
    {
        $this->_format = $format;
    }
    
    private function _formatParameters($params)
    {
        $params = '&' . http_build_query($params);
        return $params;
    }
    
    protected function _getResponse($command, $params = null)
    {
        if (!empty($params)) {
            $params = $this->_formatParameters($params);
        }
        
        $curl = curl_init();
        curl_setopt(
            $curl, 
            CURLOPT_URL, 
            $this->_request . $this->_format. '/?key=' . __KEOLIS_API_KEY__ 
                . '&version=' . $this->_version . '&cmd='. $command 
                . '&network=' . $this->_network . $params);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        if ($this->_format === self::JSON) {
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        } else if ($this->_format === self::XML) {
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
        }
        
        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }
}
