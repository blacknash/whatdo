#!/bin/sh
dump=$(date +%Y_%m_%d_%H_%M)-whatdo.sql
mysqldump -u whatdo -pwhatdo whatdo > $dump
bzip2 -9 $dump
