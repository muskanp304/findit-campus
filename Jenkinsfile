pipeline {
    agent any

    environment {
        APP_NAME    = 'findit-campus'
        IMAGE_NAME  = 'findit-campus'
        IMAGE_TAG   = "${BUILD_NUMBER}"
        DOCKER_PORT = '8080'
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo '=== Stage 1: Checking out repository from Git/GitHub ==='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '=== Stage 2: Installing npm dependencies ==='
                sh 'npm ci || npm install'
            }
        }

        stage('Static Code Analysis & Lint') {
            steps {
                echo '=== Stage 3: Running Oxlint static code analysis ==='
                sh 'npm run lint'
            }
        }

        stage('Automated Tests') {
            steps {
                echo '=== Stage 4: Running automated pipeline test suite ==='
                sh 'node --test tests/pipeline.test.js'
            }
        }

        stage('Production Build') {
            steps {
                echo '=== Stage 5: Building React + Vite production bundle ==='
                sh 'npm run build'
            }
        }

        stage('Docker Containerization') {
            steps {
                echo '=== Stage 6: Building multi-stage Docker container image ==='
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Container Healthcheck & Verification') {
            steps {
                echo '=== Stage 7: Testing Docker container startup & health ==='
                sh """
                    docker run -d --name ${APP_NAME}-test -p ${DOCKER_PORT}:80 ${IMAGE_NAME}:${IMAGE_TAG}
                    sleep 5
                    curl -I http://localhost:${DOCKER_PORT}/
                    curl http://localhost:${DOCKER_PORT}/healthz
                    docker stop ${APP_NAME}-test
                    docker rm ${APP_NAME}-test
                """
            }
        }

        stage('Deployment / Staging') {
            steps {
                echo "=== Stage 8: Deploying ${APP_NAME} to Target Host ==="
                echo "Application container successfully built and verified for deployment."
                // In production, push to registry:
                // withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                //     sh "echo \$PASS | docker login -u \$USER --password-stdin"
                //     sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                // }
            }
        }
    }

    post {
        always {
            echo 'Archiving build artifacts...'
            archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
        }
        success {
            echo "DevOps Pipeline Execution Succeeded! Build #${BUILD_NUMBER} passed all stages."
        }
        failure {
            echo "DevOps Pipeline Failed at stage: ${env.STAGE_NAME}"
        }
        cleanup {
            cleanWs()
        }
    }
}
