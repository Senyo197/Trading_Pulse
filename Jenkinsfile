pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout your code from version control
                checkout scm
            }
        }
        
        stage('Install dependencies') {
            steps {
                // Install dependencies using pip
                sh 'pip3 install -r requirements.txt'
            }
        }
        
        stage('Run tests') {
            steps {
                // Run Django tests
                sh 'python manage.py test'
            }
        }


        /*

        stage('Collect static files') {
            steps {
                // Collect static files (if needed)
                sh 'python manage.py collectstatic --noinput'
            }
        }
        
        stage('Deploy') {
            steps {
                // Your deployment steps (e.g., deploying to a server)
                // Example:
                // sh 'ansible-playbook deploy.yml'
            }
        }
        */
    }
    
    post {
        always {
            // Clean up steps
            // For example, you might want to clean up temporary files or resources
        }
        
        success {
            // Actions to perform on successful build
            // For example, sending notifications
            // sh 'notify_success.sh'
        }
        
        failure {
            // Actions to perform on failed build
            // For example, sending notifications or rollback
            // sh 'notify_failure.sh'
        }
    }
}
