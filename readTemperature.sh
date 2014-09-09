#!/bin/bash

# get sonsor list
sensorlist=`ls -v /sys/bus/w1/devices/ | grep ^[0-9]`

while [ 1 ]
do
  for S in $sensorlist
  do
    temp=`cat /sys/bus/w1/devices/${S}/w1_slave | sed -n 2p | cut -d' ' -f10 | cut -d'=' -f2`
    echo --sensor=00042d50b5ff --value=$temp
  done
  sleep 15
done
