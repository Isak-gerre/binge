<?php

// Skickar data
function sendJSON($data, $statusCode = 200)
{
    header("Content-Type: application/json");
    http_response_code($statusCode);
    $json = json_encode($data);
    echo $json;
    exit();
}
// Laddar data
function loadJSON($filename)
{
    if (!file_exists($filename)) {
        return false;
    }
    $data = json_decode(file_get_contents($filename), true);
    return $data;
}
// Sparar data
function saveJSON($filename, $data)
{
    file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
    return true;
}
// Inspekterar en variabel
function inspect($variable)
{
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
}
// Returnerar näst kommande högsta ID:t
function nextHighestId($filename)
{
    $users = loadJSON($filename);
    $highestId = 0;
    foreach ($users as $key => $user) {
        if ($user["id"] > $highestId) {
            $highestId = $user["id"];
        }
    }
    return $highestId + 1;
}
// Returnerar en array av en eller flera användare
function getUsersByIDs($arrayOfIDs)
{
    $users = loadJSON("DATABAS/users.json");
    $newArray = [];
    foreach ($users["users"] as $key => $user) {
        foreach ($arrayOfIDs as $id) {
            if ($user["id"] == $id) {
                $newArray[] = $users["users"][$key];
            }
        }
    }
    return $newArray;
}

function getUsers()
{
    $users = loadJSON("DATABAS/users.json");
    return $users["users"];
}

function getUsersById($id)
{
    $users = loadJSON("DATABAS/users.json");
    if(!is_numeric($id)){
        send(
            ["message" => "Error: Id needs to be a number"],
            400
        );
        exit();
    }
    if(!isset($users["users"][$id])){
        send(
            ["message" => "Error: user not found"],
            404
        );
        exit();
    }
    else{
        return $users["users"][$id];
    }
}

// Returnerar antalet användare efter argumentet(antal) du skickat med
function getUsersByLimit($limit)
{
    if(!is_numeric($limit) && $limit >= 0){
        send(
            ["message" => "Error: limit must be a positive number"],
            400
        );
        exit();
    }
    $users = loadJSON("DATABAS/users.json");
    array_splice($users["users"], $limit);
    return $users;
}
// Sparar info i en text fil för att kunna notera vad som skett
function logToLog($message, $error = "INFO")
{
    date_default_timezone_set('Europe/Stockholm');
    $date = date('y-m-d H:i:s');
    $output = "[$date][$error] $message \n";
    file_put_contents("log.txt", $output, FILE_APPEND);
}
// Returnerar en array av bild ID:n
function getUserPosts($id)
{
    $user = getUsersByIDs([$id]);
    $posts = $user[0]["posts"];
    return $posts;
}

// Returnerar all informtion kring all bilder
function getImages()
{
    $posts = loadJSON("DATABAS/posts.json");
    return $posts;
}

// Returnerar all informtion kring en bild med ID

function getImage($id)
{
    $posts = loadJSON("DATABAS/posts.json");
    if (preg_match("/[\W]/", $id)) {
        send(
            ["message" => "Error: Only word charachters are allowed"],
            400
        );
        exit();
    }
    if (!isset($posts["posts"][$id])) {
        send(
            ["message" => "Error: post not found"],
            404
        );
        exit();
    }
    return $posts["posts"][$id];
}

// Returnar all information kring ett span med bilder
function getImageByIds($ids)
{
    $posts = loadJSON("DATABAS/posts.json");
    if (preg_match("/[^,\w]/", $ids)) {
        send(
            ["message" => "Error: Only word charachters are allowed (and using commas as seperator)"],
            400
        );
        exit();
    }
    $idArray = explode(",", $ids);
    $posts = loadJSON("DATABAS/posts.json");
    $spanImages = [];
    $errorCode = 200;
    foreach ($idArray as $id) {
        if (!isset($posts["posts"][$id])) {
            header("Content-Type: application/json");
            $errorCode = 206;
            echo json_encode(["message" => "Error: all posts not found"]);
            continue;
        }
        $spanImages[] = $posts["posts"][$id];
    }
    return ["images" => $spanImages, "errorCode" => $errorCode];
}

function getImagesByLimit($limit)
{
    if(!is_numeric($limit) && $limit >= 0){
        send(
            ["message" => "Error: limit must be a positive number"],
            400
        );
        exit();
    }
    $posts = loadJSON("DATABAS/posts.json");
    array_splice($posts["posts"], $limit);
    return $posts;
}

//Returnerar alla bilder en användare har
function getImagesByUser($userID)
{
    $users = loadJSON("DATABAS/users.json");
    $posts = loadJSON("DATABAS/posts.json");
    if (preg_match("/\D/", $userID)) {
        send(
            ["message" => "Error: Only numbers are allowed"],
            400
        );
    }
    if (!isset($users["users"][$userID])) {
        send(
            ["message" => "Error: User not found"],
            404
        );
        exit();
    }
    if (isset($_GET["includes"]) && $_GET["includes"]) {
        $imageArray = [];
        foreach ($users["users"][$userID]["posts"] as $id) {
            $imageArray[] = $posts["posts"][$id];
        }

        return $imageArray;
    } else {
        return $users["users"][$userID]["posts"];
    }
}


// Returnerar en uppdaterad array av användarna 
function removeFromFollower($users, $userID, $following, $followers)
{
    $arrayOfUsers = $users[$userID][$following];

    foreach ($arrayOfUsers as $userid) {
        $index = array_search($userid, $arrayOfUsers);
        array_splice($users["$userid"][$followers], $index, 1);
    }

    return $users;
}
// Returnerar en uppdaterad array av användarna
function removeFromFollowing($users, $userID, $following, $followers)
{
    $arrayOfUsers = $users[$userID][$followers];

    foreach ($arrayOfUsers as $userid) {
        $index = array_search($userid, $arrayOfUsers);
        array_splice($users["$userid"][$following], $index, 1);
    }

    return $users;
}
// Returnerar en uppdaterad array av Posts
function removeLikes($posts, $userID)
{

    foreach ($posts as $key => $post) {
        foreach ($post["likes"] as $index => $id) {
            if ($userID == $id) {
                $likes = $post["likes"];
                array_splice($likes, $index, 1);
                $post["likes"] = $likes;

                $post["total_likes"] -= 1;
                $posts[$key] = $post;
            }
        }
    }

    return $posts;
}
// Kollar om nyckeln redan finns
function alreadyTaken($array, $key, $newVariable)
{
    $taken = false;
    foreach ($array as $arritem) {
        if ($arritem[$key] === $newVariable) {
            $taken = true;
            break;
        }
        return $taken;
    }
}
