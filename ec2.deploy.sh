#!/bin/bash
grunt build
scp -i certs/aws-ec2-multiplyme.pem -r server/public/*   ec2-user@52.4.250.12:~/site/temp