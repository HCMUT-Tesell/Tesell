pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('github-credentials')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    credentialsId: 'github-credentials', 
                    url: 'https://github.com/HCMUT-Tesell/Tesell'
            }
        }

        stage('Build & Run Docker Compose') {
            steps {
                sh '''
                docker-compose down
                docker-compose up --build -d
                '''
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}
