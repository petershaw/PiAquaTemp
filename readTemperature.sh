#!/bin/bash

while [ 1 ]
do
  sensorlist=`ls -v /sys/bus/w1/devices/ | grep ^[0-9]`
  for S in $sensorlist
  do
    temp=`cat /sys/bus/w1/devices/${S}/w1_slave | sed -n 2p | cut -d' ' -f10 | cut -d'=' -f2`
	echo "Read sensor ${S} with a temperature of ${temp}"
    ./bin/log --sensor=${S} --value=$temp
  done
  sleep 15
done


