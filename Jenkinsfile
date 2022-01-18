pipeline {

  environment {
        registry = "patrikptr/angular-app"
        registryCredential = 'testpatrik'
        dockerImage = ''
}
  
  
    agent any   
    

    stages {

        stage('build'){
            steps {
                echo "creating docker image"
                script {
                  
                 dockerImage = docker.build registry + ":$BUILD_NUMBER"
                  
                       }
                
            }
        }
      stage('login and push'){
            steps {
                echo "login to patrikptr"
              script {
                 docker.withRegistry( '', registryCredential ) {
                   dockerImage.push() }
                            }
              
            }
        }
        
    }
} 
