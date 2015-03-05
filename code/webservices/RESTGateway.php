<?php
class RESTGateway extends RESTBaseGateway {

    public function call($path) {
        return file_get_contents(sprintf('%s/%s', BASE_PATH, $path));
    }

    public function getRegions() {
        $path = 'silverstripe-backbone/tests/fixtures/regions.json';
        return $this->call($path);
    }

}