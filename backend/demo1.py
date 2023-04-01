import socket
import datetime
# 建立一个服务端
server = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
# 以下设置解决ctrl+c退出后端口号占用问题
server.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
server.bind(('0.0.0.0',8082)) #绑定要监听的地址（内网ip）和端口
server.listen(5) #开始监听 表示可以使用五个链接排队
print('listen')
while True:# conn就是客户端链接过来而在服务端为期生成的一个链接实例
    conn,addr = server.accept() #等待链接,多个链接的时候就会出现问题,其实返回了两个值
    print(conn, addr)
    try:
        data = conn.recv(1024)  #接收数据
        if data:
            print('recive:',data.decode()) #打印接收到的数据
    except ConnectionResetError as e:
        print('关闭了正在占线的链接！')
        break
    # conn.close()