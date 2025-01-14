<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Kebab;
use App\Services\PyszneScraper;

/**
 * @group KebabScraper
 * **/
class KebabScraperController extends Controller
{
    public function __construct(
        private PyszneScraper $scraper,
    ) {}

    public function scrapeAllReviews()
    {
        $kebabs = Kebab::all();

        $results = [];

        foreach ($kebabs as $kebab) {
            $pages = json_decode($kebab->pages, true);

            if (isset($pages["pyszne.pl"])) {
                $pyszneLink = $pages["pyszne.pl"];

                $reviews = $this->scraper->scrapeReviews($pyszneLink);

                $results[] = [
                    "kebab_id" => $kebab->id,
                    "name" => $kebab->name,
                    "reviews" => $reviews,
                ];
            }
        }

        return response()->json($results);
    }
}
