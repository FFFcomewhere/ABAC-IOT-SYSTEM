docker exec -it mysql mysql -uroot -ppassword

create database base1;

use base1;

source  /home/sql/user.sql;

source  /home/sql/device.sql;

source /home/sql/policy.sql;

