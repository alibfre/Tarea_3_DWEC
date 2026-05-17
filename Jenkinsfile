pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('firebase-token')
    }

    stages {

        stage('1. Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('2. Lint') {
            steps {
                bat 'npm run lint --if-present'
            }
        }

        stage('3. Tests') {
            steps {
                bat 'npm run test:unit --if-present'
            }
        }

        stage('4. Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('5. Deploy Firebase') {
            steps {
                bat 'npm install -g firebase-tools'
                bat 'firebase deploy --only hosting --token %FIREBASE_TOKEN%'
            }
        }
    }

    post {
        success {
            echo '✅ Deploy completado en Firebase'
        }
        failure {
            echo '❌ Pipeline fallido, revisa los logs'
        }
    }
}
