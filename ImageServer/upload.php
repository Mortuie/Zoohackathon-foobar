<?php
    include 'dbconnect.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $defaultId = 0;
        $imageData = $_POST['image_data'];
        $imageName = $_POST['image_name'];

        $previous_id = "SELECT id FROM images ORDER BY id ASC";

        $query = mysqli_query($conn, $previous_id);

        while ($row = mysqli_fetch_array($query)) {
            $defaultId = $row['id'];
        }

        $imagePath = "images/$defaultId.png";
        $serverUrl = "http://35.195.201.85/$imagePath";
        $insertSQL = "INSERT INTO images (id, image_path, image_name) VALUES (DEFAULT, '$serverUrl', '$imageName')";

        if (mysqli_query($connection, $insertSQL)) {
            file_put_contents($imagePath, base64_decode($imageData));
            echo "Image uploaded!";
            mysqli_close($connection);
        } else {
            echo "Image upload failed!";
        }
    }
?>