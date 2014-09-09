#!/bin/bash

while [ 1 ]
do
  temp=`cat /sys/bus/w1/devices/28-00042d50b5ff/w1_slave | sed -n 2p | cut -d' ' -f10 | cut -d'=' -f2`
  ./bin/log --sensor=00042d50b5ff --value=$temp
  sleep 30
done
