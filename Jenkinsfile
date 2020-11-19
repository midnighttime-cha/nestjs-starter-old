def notify(message) {
    def token = "QgqHMTsiNMd7yVAiYylPifdhEbJCzQPxnuiqKFNWoHf";
    def jobName = env.JOB_NAME + ' - ' + env.BRANCH_NAME;
    def buildNo = env.BUILD_NUMBER;
      
    def url = "https://notify-api.line.me/api/notify";
    def lineMessage = "${jobName} [#${buildNo}] : ${message} \r\n";
    sh "curl ${url} -H 'Authorization: Bearer ${token}' -F 'message=${lineMessage}'";
}

def FAILED_STAGE
pipeline {
    agent none

    environment {
        registryUrl = 'https://registry.gitlab.com'
        registry = 'registry.gitlab.com/preotier/aj-fruit/api'
        registryCredential = 'registry-gitlab'
        dockerImage = ''
    }

    stages {
        stage('Yarn Install') {
            agent {
                docker {
                    image 'node:13.8.0'
                    args '-u 0:0'
                }
            }

            steps {
                script {
                    try {
                        echo 'Yarn Install'
                        echo '------------------------------------------------------------------------------------------------------------'
                        sh 'node --version'
                        sh 'yarn --version'
                        sh 'yarn install'
                    }catch (Exception err) {
                        notify(err)
                    }
                }
            }
        }
        stage('Yarn Build') {

            agent {
                docker {
                    image 'node:13.8.0'
                    args '-u 0:0'
                }
            }

            steps {
                script {
                    try {
                        echo 'Yarn Build'
                        echo '------------------------------------------------------------------------------------------------------------'
                        sh 'yarn build'
                    }catch(err){
                        notify(err)
                    }
                }
            }
        }

        stage('Docker Build') {

            agent any

            steps{
                echo 'Docker Build'
                echo '------------------------------------------------------------------------------------------------------------'
                script{
                    try{
                        dockerImage = docker.build registry + ":latest"
                    }catch(err){
                        notify(err)
                    }
                }
            }
        }

        stage('Docker Push') {
            agent any
            steps{
                echo 'Docker Push'
                echo '------------------------------------------------------------------------------------------------------------'
                script {
                    try{
                        docker.withRegistry(registryUrl, registryCredential) {
                            dockerImage.push()
                        }
                    }catch(err){
                        notify(err)
                    }
                    
               }
            }
        }

        stage('Deploy') {
            agent any
            steps{
                echo 'Deploy'
                echo '------------------------------------------------------------------------------------------------------------'
                script{
                    try{
                        sh 'chmod 744 deploy.sh'
                        sh 'sh deploy.sh'
                    }catch(err){
                        notify(err)
                    }
                }
                
            }
        }
    }
    
}
