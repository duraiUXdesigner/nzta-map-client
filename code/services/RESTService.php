<?php
class RESTService {

	/**
     * @var RESTGateway
     */
    public $RESTGateway;

    private static $dependencies = array(
        'RESTGateway' => '%$RESTGateway'
    );

    public function regions() {
        $response = $this->RESTGateway->cachedCall('getRegions');

        return $response;
    }

}
