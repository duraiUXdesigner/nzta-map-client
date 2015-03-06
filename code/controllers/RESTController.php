<?php
class RESTController extends Controller {

	/**
     * @var RESTService
     */
    public $RESTService;

    private static $dependencies = array(
        'RESTService' => '%$RESTService'
    );

    /**
     * Defines the routes with app responses.
     * @var array
     */
	private static $allowed_routes = array();

    public function init() {
    	parent::init();

        Requirements::css('silverstripe-backbone/css/normalize.css');
        Requirements::css('silverstripe-backbone/css/leaflet.css');
        Requirements::css('silverstripe-backbone/css/map.css');
        Requirements::javascript('silverstripe-backbone/javascript/dist/bundle.js');
    }

    public function handleAction($request, $action) {
        if($this->allowedRoute($action)) {
            return $this;
        }

        // return the template on root.
        if($action == 'index') {
            return parent::handleAction($request, $action);
        }

        // return the service response on action.
        return $this->RESTService->$action();
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
