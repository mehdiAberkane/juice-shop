<?php

echo "start php xss";
if (isset($argv) && isset($argv[1])) {
    echo "php code exec";

    return readfile('xss.html');
}

?>