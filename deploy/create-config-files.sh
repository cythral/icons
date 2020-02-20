#!/bin/bash

for file in $(find deploy/params -name '*.json'); do
    envName=$(echo $file | xargs basename | sed 's/\.params\.json//g')
    params=$(cat $file)

    config=$(echo {} | jq --argjson params "$params" '.Parameters=$params')
    echo $config > icons.${envName}.config.json
done
