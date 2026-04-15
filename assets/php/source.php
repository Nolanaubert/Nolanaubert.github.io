<?php
header("Access-Control-Allow-Origin: *");

$urls = [
    "https://www.cert.ssi.gouv.fr/feed/",
    "https://www.microsoft.com/security/blog/feed/",
    "https://www.it-connect.fr/feed/"
];

$resultats = [];

foreach ($urls as $url) {
    $xml = @simplexml_load_file($url);

    if ($xml) {
        foreach ($xml->channel->item as $item) {
            $resultats[] = [
                "titre" => (string)$item->title,
                "lien" => (string)$item->link,
                "source" => (string)$xml->channel->title
            ];
        }
    }
}

echo json_encode($resultats);
?>