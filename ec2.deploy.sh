#!/bin/bash
grunt build
scp -i certs/aws-ec2-multiplyme.pem -r server/public/*   ec2-user@52.3.216.212:~/site/temp