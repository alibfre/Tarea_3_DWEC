pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('firebase-token')
    }

    stages {

        stage('1. Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('2. Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('3. Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }

        stage('4. Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('5. Deploy Firebase') {
            steps {
                sh 'npm install -g firebase-tools'
                sh 'firebase deploy --only hosting --token $FIREBASE_TOKEN'
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
