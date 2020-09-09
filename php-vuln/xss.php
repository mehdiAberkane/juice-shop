<?php

echo "start php xss";
if (isset($argv) && isset($argv[1])) {
    echo "php code exec";

    return file_get_contents('xss.html');
}

?>