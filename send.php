<?php

$token = "8985554272:AAETBGMHuPwIqITSPkgDDbUqgv5hZbgsPFw";
$chat_id = "1035611647";

$name = $_POST["name"];
$phone = $_POST["phone"];
$message = $_POST["message"];

$text = "🐝 Новая заявка BeeLab\n\n";
$text .= "👤 Имя: $name\n";
$text .= "📞 Телефон: $phone\n";
$text .= "💬 Комментарий: $message";

$url = "https://api.telegram.org/bot$token/sendMessage";

$data = [
    "chat_id" => $chat_id,
    "text" => $text
];

$options = [
    "http" => [
        "header" => "Content-type: application/x-www-form-urlencoded",
        "method" => "POST",
        "content" => http_build_query($data)
    ]
];

$context = stream_context_create($options);

file_get_contents($url, false, $context);

echo "success";
?>