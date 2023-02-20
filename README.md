# 服务端部分 
app

## 路由和请求
### 用户
1. login  登录
2. login up 注册
3. logout 退出登录

### 控制
1. addDevice  添加设备   对应操作 write
2. deleteDevice 删除设备 对应操作 write
3. updateDevice 更新设备 对应操作 write
4. getDeviceInfo 获取设备信息 对应操作 read
5. getDeviceList 获取设备列表 对应操作 read

## 表单
### 用户
1. 用户名 username 
2. 密码 password 
3. 读 readRole
4. 写 writeRole 

### 设备
1. 设备名 name
2. 设备状态 0/1 state
3. 设备电量 0-100  power

# 合约部分
## 成员变量
1. policy 属性 
2. policyHash 属性hash
3. owner 合约拥有者 

## 方法
1. setPolicy 更新属性并取hash
2. getPolicy 获取属性
3. getPolicyHash 获取属性hash

## 配置
1. 网络 目前使用的是ganache网络，网络位于windows系统下，端口为8545，ip为172.25.144.1
2. mysql name:iot password:passowrd
 docker run -p 3306:3306 --name iot-mysql -v ~/code/solidity/Web3Demo/demo1/ABAC-IOT-SYSTEM/app/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password  -d mysql:5.7
