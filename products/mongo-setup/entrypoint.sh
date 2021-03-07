until mongo --host "mongodb://mongo.svc.svc.cluster.local:27017" --eval "print(\"waited for connection\")"
do
    sleep 1
done

// you can add more MongoDB waits here

echo "Setting up ingredients."
mongo "mongodb://mongo.svc.svc.cluster.local:27017" "/mongo-setup.js"
echo "Setup done."