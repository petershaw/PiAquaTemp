#!/bin/bash

# log cpu load
while [  1 -lt 2 ]; do ./bin/log -s load -v $(sysctl -n vm.loadavg | awk '/./ { printf "%s\n", $2 }'); sleep 1; done

# log processort temperature with https://github.com/lavoiesl/osx-cpu-temp 
while [  1 -lt 2 ]; do ./bin//log -s temp -v $(osx-cpu-temp); done

