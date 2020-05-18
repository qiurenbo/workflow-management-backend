pipeline {

    agent any

    stages {
        stage('Build') {
            steps {
                sh "docker build -t squirrel-backend ."
              
            }
        }

        stage('Test') {
            steps {
                echo "test"
            }
        }

        stage('Push to harbor') {
            steps {
                sh "docker login10.1.5.76 -u admin -p Harbor12345"
                sh "docker tag squirrel-backend10.1.5.76/library/squirrel-backend"
                sh "docker push10.1.5.76/library/squirrel-backend"
                sh "docker rmi --force10.1.5.76/library/squirrel-backend"
            }
        }

        stage('Pull from harbor') {
            steps {
                script {
                    def remote = [:]
                    remote.name = 'test'
                    remote.host = '10.1.5.52'
                    remote.port = 22
                    remote.allowAnyHosts = true
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'test',
                            keyFileVariable: 'identity',
                            passphraseVariable: '',
                            usernameVariable: 'userName')
                        ])
                    {
                        remote.user = userName
                        remote.identityFile = identity

                        sshCommand remote: remote, command: "if [ \$(docker ps | grep -c \"squirrel-backend\") == 1 ]; then docker stop  squirrel-backend; fi"
                        sshCommand remote: remote, command: "if [ \$(docker ps -a | grep -c \"squirrel-backend\") == 1 ]; then docker rm squirrel-backend; fi"
                        sshCommand remote: remote, command: "if [ \$(docker images | grep -c \"192.168.33.12/library/squirrel-backend\") == 1 ]; then docker rmi --force10.1.5.76/library/squirrel-backend; fi"

                        sshCommand remote: remote, command: "docker login10.1.5.76 -u admin -p Harbor12345"
                    
                        sshCommand remote: remote, command: "docker pull10.1.5.76/library/squirrel-backend"

                        sshCommand remote: remote, command: "docker run -d --network host --restart=always  --name squirrel-backend10.1.5.76/library/squirrel-backend"
                    }
                
                }
      
            }

        }
   
    }
}
