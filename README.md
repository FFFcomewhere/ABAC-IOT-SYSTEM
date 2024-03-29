# 树莓派
账号 root 
密码 root

# 服务端部分 
app

## 路由和请求
### 用户
1. login(username, password) bool  登录
2. register(username, password, role) 注册 root/member
3. getUserInfo(username) 获取用户信息
4. getUserList() 获取用户列表
5. 

### 设备
默认 root 拥有所有设备的读写权限 member 拥有所有设备的读权限
1. addDevice(name, state)  添加设备   对应操作 write
2. deleteDevice(name) 删除设备 对应操作 write
3. updateDevice(name, state) 更新设备 对应操作 write
4. getDeviceInfo(name) 获取设备信息 对应操作 read
5. getDeviceList() 获取设备列表 对应操作 read

### 策略
1. addPolicy(role, deviceName, operation) 添加策略 
2. deletePolicy(role, deviceName, operation) 删除策略
3. getPolicyInfo(role, deviceName) 获取策略
4. getPolicyList() 获取策略列表


## 表单
### 用户
1. 用户名 username 
2. 密码 password 
3. 权限 role

### 设备
1. 设备名 name
2. 设备状态 0/1 state
3. 设备电量 0-100  power

### 策略
1. 角色 role
2. 设备名 deviceName
3. 策略 operation

# 合约部分
## 成员变量
1. policy 属性 
2. policyHash 属性hash
3. owner 合约拥有者 

## 方法
注意，这里的policy的格式为role deviceName operator deleted_flag
1. addPolicy 更新属性并取hash
2. getPolicyRoot 获取属性凭证



## 配置
1. 网络 目前使用的是ganache网络，网络位于windows系统下，端口为8545，ip为172.25.144.1
2. mysql name:iot password:passowrd
 docker run -p 3306:3306 --name iot-mysql -v ~/code/solidity/Web3Demo/demo1/ABAC-IOT-SYSTEM/app/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password  -d mysql:5.7

database name: base1

ganache : docker run --name ganache -p 8545:8545 trufflesuite/ganache-cli 


## 部署与启动合约
1. truffle migrate --network ganache
2. truffle 


## 开启设备
dockerk开启mysql 和 ganache  docker start iot-mysql / docker start ganache
智能合约  truffle migrate --network ganache
后端 npm run start 
前端 npm run serve
