<!-- 
    * Vi får MovieID, kalla på TM-database
    * Skicka tillbaka data till klienten

    
 -->
 <?php

require_once "functions.php";

$method = $_SERVER["REQUEST_METHOD"];

if($method == "GET" && $GET["similar-movies"]){
    if(!is_numeric($GET["similar-movies"])){
        send(["Error" => 404]);
    }
}


function getSimilarMovies($movie_id){

    // The URL that we want to GET.
    $url = "https://api.themoviedb.org/3//movie/{$movie_id}/similar?api_key=f5c0e0db147d0e6434391f3ff153b6a8";

    //Use file_get_contents to GET the URL in question.
    $contents = file_get_contents($url);

    if ($contents !== false) {
        //Print out the contents.
        send(
            ["message" => json_decode($contents, true)]
        );
    }
    

}



?>
