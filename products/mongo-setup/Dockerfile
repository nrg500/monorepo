FROM mongo
COPY mongo-setup.js /mongo-setup.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod u+x /mongo-setup.js /entrypoint.sh
CMD /entrypoint.sh