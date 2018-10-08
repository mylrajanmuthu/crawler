
'use strict';

const Crawler = require('../lib/crawler');
const nock = require('nock');

describe('Callback test', function() {
	before(function() {
		nock.cleanAll();
	});
	
	let crawler = null;
	const url = 'http://www.wipro.com';

	beforeEach(() => {
		crawler = new Crawler({
			retryTimeout:0,
			retries:0,
			timeout:100,
			logger: {
				log:() => {}
			},
		});
	});
	
	afterEach(() => {
		crawler = null;
	});
    
	it('should end as expected without callback', function(done) {
		nock(url)
			.get('/get')
			.reply(200, '<html></html>',{
				'Content-Type': 'text/html'
			});
		
		crawler.on('drain', done);
		crawler.queue(`${url}/get`);
	});

    
	it('should end as expected without callback when encoding error', function(done) {
		nock(url)
			.get('/get')
			.reply(200, '<html></html>',{
				'Content-Type': 'text/html'
			});

		crawler._doEncoding = function(){throw new Error('Error for testing.');};
		crawler.on('drain', done);
		crawler.queue(`${url}/get`);
	});
});
