pipeline {

    agent any   
    def app

    stages {

        stage('build'){
            steps {
                echo "creating docker image"
                app = sh 'docker build -t test .'
                
            }
        }
      stage('login'){
            steps {
                echo "login to patrikptr"
              
                docker.withRegistry('https://registry.hub.docker.com', 'testpatrik') {                      
                app.push("latest")
            }
        }
        stage('push'){
          steps {    
            
                
                echo "pushing to docker hub..."
                
            }
        }
    }
} 
