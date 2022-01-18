pipeline {

    agent any   

    stages {

        stage('build'){
            steps {

                sh 'docker build -t test2 .'
                
            }
        }
        stage('test'){
            steps {

                echo "testing..."
                
            }
        }
    }
} 
