    <?php

    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Authorization, Content-Type, x_csrftoken, Cache-Control, X-Requested-With');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    require '../vendor/autoload.php';   

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();

    $dados = json_decode(file_get_contents("php://input"), true);

    if ($dados && isset($dados['jwt']) && !empty($dados['jwt'])){
        $token = $dados['jwt'];
        try{
            $decoded = JWT::decode($token, new Key($_SERVER['KEY'], 'HS256'));
            if($decoded->exp < time()){
                throw new Exception('Expired token');
            }
            if($decoded->email){
                echo json_encode(['message' => 'Token valido', 'authorized' => true]);
                exit;
            }
        }catch(Throwable $e){
            if($e->getMessage() === 'Expired token'){
                http_response_code(401);
                die(json_encode(['error' => 'Token expirado', 'authorized' => false]));
            }
            http_response_code(401);
            echo json_encode(['error' => 'Token invalido', 'authorized' => false]);
            exit;
        }
    }else{
        http_response_code(401);
        echo json_encode(['error' => 'Token nao encontrado', 'authorized' => false]);
        exit;
    }
