<?php
class RESTService {

	/**
     * @var RESTGateway
     */
    public $RESTGateway;

    private static $dependencies = array(
        'RESTGateway' => '%$RESTGateway'
    );

}
