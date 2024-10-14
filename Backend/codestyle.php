<?php

declare(strict_types=1);

use Blumilk\Codestyle\Config;
use Blumilk\Codestyle\Configuration\Defaults\Paths;

$config = new Config(
    paths: new Paths("tests", "codestyle.php", "config", "app", "bootstrap", "database", "public", "resources", "routes", "storage"),
);

return $config->config();
