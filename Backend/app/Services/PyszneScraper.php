<?php

declare(strict_types=1);

namespace App\Services;

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class PyszneScraper
{
    public function scrapeReviews(string $url)
    {
        try {
            $client = new Client([
                "headers" => [
                    "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "Accept-Language" => "en-US,en;q=0.5",
                    "Accept" => "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                    "Referer" => "https://www.pyszne.pl",
                ],
                "timeout" => 10.0,
            ]);
            $response = $client->get($url);

            if ($response->getStatusCode() !== 200) {
                throw new \Exception("Failed to retrieve the page");
            }

            $htmlContent = $response->getBody()->getContents();

            $crawler = new Crawler($htmlContent);

            $element = $crawler->filter('[data-qa="restaurant-header-score"] b')->first();

            if ($element->count()) {
                return $element->text();
            }

            throw new \Exception('Element with data-qa="restaurant-header-score" and <b> child not found');
        } catch (\Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
