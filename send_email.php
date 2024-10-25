<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    $captchaToken = $_POST['cf-turnstile-response']; // Get the CAPTCHA token

    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "Please fill in all fields.";
        exit;
    }

    // Validate Cloudflare Turnstile CAPTCHA
    $secretKey = ""; // Replace with your Cloudflare Turnstile secret key
    $verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    
    // Prepare POST data for CAPTCHA validation
    $data = [
        'secret' => $secretKey,
        'response' => $captchaToken,
        'remoteip' => $_SERVER['REMOTE_ADDR'] // optional, to pass user's IP
    ];
    
    // Make the POST request to Cloudflare to verify CAPTCHA
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($verifyUrl, false, $context);
    $responseData = json_decode($result);

    if (!$responseData->success) {
        echo "Captcha verification failed.";
        exit;
    }

    // Set up email details
    $to = "apol1info@mazetx.com"; // Replace with your actual email
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    $email_subject = "New Message from: $name ($subject)";
    $email_body = "You have received a new message from the contact form.\n\n".
                  "Name: $name\n".
                  "Email: $email\n".
                  "Subject: $subject\n".
                  "Message: \n$message\n";
    
    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Message could not be sent.";
    }
}
?>
