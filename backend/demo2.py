import socket

host = '0.0.0.0' # 监听所有网络接口
port = 8802 # 监听的端口号

# 创建 Socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((host, port))
server_socket.listen(1)

print(f"Listening on {host}:{port}")

while True:
  # 等待客户端连接
  client_socket, client_address = server_socket.accept()
  print(f"New connection from {client_address[0]}:{client_address[1]}")

  while True:
    # 接收客户端发送的消息
    data = client_socket.recv(1024)
    if not data:
      break

    print(f"Received message from client: {data.decode('utf-8')}")

    # 向客户端发送响应
    client_socket.sendall("Hello, ESP32!\n".encode('utf-8'))

  print(f"Connection closed by {client_address[0]}:{client_address[1]}")
  client_socket.close()
