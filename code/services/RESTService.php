<?php
class RESTService {

	/**
     * @var RESTGateway
     */
    public $RESTGateway;

    /**
     * @var ConversionService
     */
    public $ConversionService;

    private static $dependencies = array(
        'RESTGateway' => '%$RESTGateway',
        'ConversionService' => '%$ConversionService'
    );

    public function regions() {
        $response = $this->RESTGateway->cachedCall('getRegions');

        if(!$response) {
            return null;
        }

        return $this->ConversionService->jsonToGeoJson($response, 'region', 'region');
    }

}
