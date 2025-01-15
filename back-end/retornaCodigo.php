<?php

function retorna_codigo($codigo){
    echo json_encode(
        array("codigo" => $codigo)
    );	
}