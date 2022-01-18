pipeline {

    agent any   

    stages {

        stage('build'){
            steps {
                echo "creating docker image"
                sh 'docker build -t test .'
                
            }
        }
      stage('login'){
            steps {
                echo "maybe ill need a login"       
            }
        }
        stage('push'){
          steps {    
            
                sh 'docker tag test patrikptr/test:1'
                sh 'docker push patrikptr/test:1'
                echo "pushing to docker hub..."
                
            }
        }
    }
} 
