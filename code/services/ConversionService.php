<?php
class ConversionService {

	/**
	 * Convert a json string to a geojson string.
	 * Expects a geometry parameter.
	 * 
	 * @param  String $string   json string containing elements to convert.
	 * @param  String $parent   name of the parent in the json string.
	 * @param  String $feature  name of the child features.
	 * @return String           json encoded GeoJSON response.
	 */
	public function jsonToGeoJson($string, $parent, $feature) {
		$json = json_decode($string);
        $geojson = array('type' => 'FeatureCollection', 'features' => array());

        foreach($json->$parent as $child) {

        	// if no geometry set than skip the feature.
        	if(!isset($child->geometry) && (!isset($child->latitude) && !isset($child->longitude))) {
        		continue;
        	}

        	// grab all the element properties.
            $properties = array();
            foreach($child as $name => $value) {
            	if($name == 'geometry' || $name == 'latitude' || $name == 'longitude') {
            		continue;
            	}

            	$properties[$name] = $value;
            }

            // add the feature type to the properties.
            $properties['featureType'] = $feature;

            $type = (isset($child->geometry) ? $this->getGeometryType((String)$child->geometry) : 'Point');
            $coords = (isset($child->geometry) ? $this->convertGeometryCoordinates((String)$child->geometry) : array((Float)$child->longitude, (Float)$child->latitude));

            // add the geojson feature.
            $geojson['features'][] = array(
                'type' => 'Feature',
                'geometry' => array(
                    'type' => $type,
                    'coordinates' => $coords
                ),
                'properties' => $properties
            );
        }

        return json_encode($geojson);
	}

	/**
	 * Get the type of geometry based of an XML string.
	 * eg. "POINT (174.09232225036325 -35.467560563709924)" will return "Point".
	 * 
	 * @param  String $geometry Full XML geometry string.
	 * @return String           The type (eg Point).
	 */
	public function getGeometryType($geometry) {
		$arr = explode(' ',trim($geometry));
		$type = strtolower($arr[0]);

		if($type == 'multilinestring') {
			return 'MultiLineString';
		} elseif($type == 'linestring') {
			return 'LineString';
		} elseif($type == 'polygon') {
			return 'Polygon';
		} else {
			return ucfirst($type);
		}
	}

	/**
	 * Get the coordinates based of an XML string.
	 * eg. "POINT (174.09232225036325 -35.467560563709924)" will return 
	 * array(174.09232225036325, -35.467560563709924).
	 * 
	 * @param  String $geometry Full XML geometry string.
	 * @return Array           	The coordinates as an array representation.
	 */
	public function convertGeometryCoordinates($geometry) {
		$coordinates = array();

		preg_match_all('#\((.*?)\)#', $geometry, $match);
		$geo = $match[1];
		
		switch ($this->getGeometryType($geometry)) {
			case 'Polygon':
				if(is_string($geo)) {
					$geo = array($geo);
				}

				foreach($geo as $coord) {
					$coord = str_replace('(', '', $coord); // remove bracket
					$arr = explode(',', $coord);
                    $set = array();
					foreach($arr as $a) {
						$parts = explode(' ', trim($a));
						$set[] = $this->getLonLat((float)$parts[0], (float)$parts[1]);
					}
                    $coordinates[] = $set;
				}

				break;
			case 'MultiLineString':
				if(is_string($geo)) {
					$geo = array($geo);
				}

				foreach($geo as $coord) {
					$coord = str_replace('(', '', $coord); // remove bracket
					$arr = explode(',', $coord);
					$set = array();
					foreach($arr as $a) {
						$parts = explode(' ', trim($a));
						$set[] = $this->getLonLat((float)$parts[0], (float)$parts[1]);
					}
					$coordinates[] = $set;
				}

				break;
			case 'LineString':
				if(is_string($geo)) {
					$geo = array($geo);
				}

				foreach($geo as $coord) {
					$coord = str_replace('(', '', $coord); // remove bracket
					$arr = explode(',', $coord);
					$set = array();
					foreach($arr as $a) {
						$parts = explode(' ', trim($a));
						$set[] = $this->getLonLat((float)$parts[0], (float)$parts[1]);
					}
					$coordinates = $set;
				}

				break;
			case 'Point':
				$parts = explode(' ', $geo[0]);
				$coordinates = $this->getLonLat((float)$parts[0], (float)$parts[1]);

				break;
		}

		return $coordinates;
	}

	public function getLonLat($part1, $part2) {
        $lon = ($part1 > 0 ? $part1 : $part2);
		$lat = ($part1 < 0 ? $part1 : $part2);

		return array($lon, $lat);
	}
	
}