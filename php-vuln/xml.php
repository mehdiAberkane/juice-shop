<?php

echo "start php";
if (isset($argv) && isset($argv[1])) {
    libxml_disable_entity_loader(false);

    echo "php code exec";

    $xmlfile = base64_decode($argv[1]);

    $dom = new DOMDocument(); 
    $dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);

    echo $dom->saveXML() . "\n";
}

?>