pipeline {

    agent any   
  
    tools {nodejs "node"}

    stages {

        stage('build'){
            steps {

                echo "building..."
                sh 'npm install'

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
