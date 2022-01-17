pipeline {

    agent any   

    stages {

        stage('build'){
            steps {

                echo "building..."
                sh "npm install"

            }
        }
        stage('test'){
            steps {

                echo "testing..."
                sh 'ng serve'

            }
        }
    }
} 
