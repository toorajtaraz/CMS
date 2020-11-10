#!/bin/sh

col=$1;
out=$2;
uri=$3;
for collection in $col; do
  mongodump --uri $uri --collection $collection --out $out
done
