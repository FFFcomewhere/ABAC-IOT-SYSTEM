docker run -p 3306:3306 --name iot-mysql -v ~/code/solidity/Web3Demo/demo1/ABAC-IOT-SYSTEM/app/data:/var/lib/mysql -v ~/code/solidity/Web3Demo/demo1/ABAC-IOT-SYSTEM/app/sql:/home/sql  -e MYSQL_ROOT_PASSWORD=password  -d mysql:5.7 

docker exec -it iot-mysql mysql -uroot -ppassword

create database base1;

use base1;

source  /home/sql/user.sql;

source  /home/sql/device.sql;