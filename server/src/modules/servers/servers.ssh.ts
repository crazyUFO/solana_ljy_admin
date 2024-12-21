const { Client } = require('ssh2');


// SSH 配置
// const sshConfig = {
//   host: '远程服务器IP或域名',
//   port: 22,
//   username: '你的用户名',
//   password: '你的密码', // 或 privateKey
// };

// 执行命令的函数
export const executeCommand = (command,sshConfig) => {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on('ready', () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            reject(err);
            conn.end();
            return;
          }

          let stdout = '';
          let stderr = '';

          stream
            .on('close', (code, signal) => {
              conn.end();
              if (code === 0) {
                resolve(stdout); //返回标准输出
              } else {
                reject(stderr || `Command failed with code ${code}`);
              }
            })
            .on('data', (data) => {
                console.log(data.toString())
              stdout += data; //收集标准输出
            })
            .stderr.on('data', (data) => {
                console.log(data.toString())
              stderr += data; //收集错误输出
            });
        });
      })
      .on('error', (err) => {
        reject(err);
      })
      .connect(sshConfig);
  });
};
