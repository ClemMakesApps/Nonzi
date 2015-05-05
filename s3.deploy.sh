#!/bin/bash          

grunt build

#delete s3 bucket contents
aws s3 rm s3://amala-multiplyme.in/ --recursive

#upload /dist
aws s3 cp dist s3://amala-multiplyme.in/ --recursive