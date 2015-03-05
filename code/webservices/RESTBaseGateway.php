<?php
class RESTBaseGateway {

    /**
     * Provides caching on API calls.
     * 
     * @param  String   $method
     * @param  Array    $args       
     * @return mixed
     */
    public function cachedCall($method, $args = array()) {
        $time = time();
        $key = $this->generateKey($method, $args);
        $cache = SS_Cache::factory('RESTGateway', 'Output', array('automatic_serialization' => true));

        // If there is no cache available fetch new data.
        if(!($result = $cache->load($key))) {
            $result = call_user_func_array(array($this, $method), array($args));
            $cache->save($result, $key);
        }

        return $result;
    }

    public function clearCache($method, $args = array()) {
        $key = $this->generateKey($method, $args);
        $cache = SS_Cache::factory('RESTGateway');
        $cache->remove($key);
    }

    public function generateKey($method, $args = array()) {
        return md5(var_export(array_merge(array('_method' => $method), $args), true));
    }

}
