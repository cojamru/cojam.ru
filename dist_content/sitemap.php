<?php
	header('Content-type: application/xml');
	date_default_timezone_set('Europe/Moscow');

	$server = 'https://' . $_SERVER['SERVER_NAME'];
	$content = ['index', 'music', 'games'];

	$sm = '<urlset xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">';

	foreach ($content as &$url) {
		$sm .= '<url>';
		$sm .= '<loc>' . $server . ($url != 'index' ? '/' . $url : '') . '</loc>';
		$sm .= '<lastmod>' . date('c', filemtime($url . '.html')) . '</lastmod>';
		$sm .= '</url>';
	}

	$sm .= "</urlset>\n"; // двойные кавычки нужны, чтобы отображался перевод строки

	echo $sm;
?>