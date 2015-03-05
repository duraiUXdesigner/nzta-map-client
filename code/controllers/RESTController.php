<?php
class RESTController extends Controller {

	/**
     * @var RESTService
     */
    public $RESTService;

    private static $dependencies = array(
        'RESTService' => '%$RESTService'
    );

	private static $allowed_actions = array(
	);

	private static $allowed_routes = array(
    );

    public function init() {
    	parent::init();
    }

	/**
     * Override to check allowed routes.
     */
    public function hasAction($action) {
        return ($this->allowedRoute($action) ? true : parent::hasAction($action));
    }

    /**
     * Override to check allowed routes.
     */
    public function checkAccessAction($action) {
        return ($this->allowedRoute($action) ? true : parent::checkAccessAction($action));
    }

    /**
     * Check allowed routes for app actions, if not allowed and not the index then redirect to the index.
     * 
     * @param  string   $action     action to check against
     * @return boolean              true if action is defined in the allowed_routes
     */
    public function allowedRoute($action) {
        $allowedRoutes = Config::inst()->get('RESTController', 'allowed_routes');
        if(
            is_array($allowedRoutes) 
            && (($key = array_search($action, $allowedRoutes, true)) !== false) 
        ) {
            return true;
        } 
        
        return false;
    }

}
