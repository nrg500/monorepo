until mongo --host mongo --eval "print(\"waited for connection\")"
do
    sleep 1
done

// you can add more MongoDB waits here

echo "Setting up ingredients."
mongo mongodb://mongo:27017 < /mongo-setup.js
echo "Setup done."