deploy:
	tar czvf api.tar.gz _book
	scp api.tar.gz root@115.28.138.239:/web/www/car/doc/api.tar.gz
	ssh root@115.28.138.239 "cd /web/www/car/doc && rm -rf api/* && tar -zxvf api.tar.gz && cp -r _book/* api && rm -rf _book && rm -rf api.tar.gz"
