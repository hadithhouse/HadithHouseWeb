#!/usr/bin/env groovy

pipeline {
  agent any

  stages {
    stage('Install Node modules') {
      steps {
        sh('npm install')
      }
    }

    stage('Build Dev') {
      steps {
        sh('npm run build-dev')
      }
    }

    stage('Lint Dev') {
      steps {
        sh('npm run lint')
      }
    }

    stage('Lint Dev') {
      steps {
        sh('npm run test')
      }
    }

    stage('Deploy Dev') {
      when {
        // Deploy only when the branch being built is master.
        expression { env.BRANCH_NAME == 'master' }
      }
      steps {
        echo('Archive  folder')
        sh('zip -qr /tmp/HadithHouseWeb.zip dist/ scripts/')

        echo('Copy the archive to dev.hadithhouse.net for deployment')
        sh('''scp /tmp/HadithHouseWeb.zip deployer@dev.hadithhouse.net:/tmp/HadithHouseWeb.zip
rm /tmp/HadithHouseWeb.zip
''')

        echo ('Unzip the archive and start the deployment.')
        sh('''ssh deployer@dev.hadithhouse.net << "EOF"
cd /tmp
rm -rf HadithHouseWeb
mkdir HadithHouseWeb
unzip -qo /tmp/HadithHouseWeb.zip -d HadithHouseWeb
cd HadithHouseWeb
chmod u+x scripts/deploy.sh
./scripts/deploy.sh
deploy_exit_code=$?
cd ..
rm -rf HadithHouseWeb
exit $deploy_exit_code
EOF
exit $?
''')
      }
    }

    stage('Build Prod') {
      when {
        // Deploy only when the branch being built is master.
        expression { env.BRANCH_NAME == 'master' }
      }
      steps {
        sh('rm -rf dist/')
        sh('npm run build')
      }
    }

    stage('Deploy Prod') {
      when {
        // Deploy only when the branch being built is master.
        expression { env.BRANCH_NAME == 'master' }
      }
      steps {
        echo('Archive  folder')
        sh('zip -qr /tmp/HadithHouseWeb.zip dist/ scripts/')

        echo('Copy the archive to www.hadithhouse.net for deployment')
        sh('''scp /tmp/HadithHouseWeb.zip deployer@www.hadithhouse.net:/tmp/HadithHouseWeb.zip
rm /tmp/HadithHouseWeb.zip
''')

        echo ('Unzip the archive and start the deployment.')
        sh('''ssh deployer@www.hadithhouse.net << "EOF"
cd /tmp
rm -rf HadithHouseWeb
mkdir HadithHouseWeb
unzip -qo /tmp/HadithHouseWeb.zip -d HadithHouseWeb
cd HadithHouseWeb
chmod u+x scripts/deploy.sh
./scripts/deploy.sh
deploy_exit_code=$?
cd ..
rm -rf HadithHouseWeb
exit $deploy_exit_code
EOF
exit $?
''')
      }
    }
  }
}
