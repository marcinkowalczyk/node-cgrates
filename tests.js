var assert = require('assert');
var CGRates = require('./index');

var cgRates = null;

describe("CGRates", function() {
	beforeEach(function() {
		cgRates = new CGRates("http://test.com");
	});

	it("should require a url", function(){
		cgRates.needle = {};
		assert.throws(CGRates, Error, "CGRates allowed initialization without a URL");
	});

	describe("Accounts", function() {
		describe("GetAccounts", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.getAccounts({});}, function(err){return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should reject if the http request fails", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(new Error('test'));
				};

				var promise = cgRates.getAccounts({Tenant:'test'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http status code is not 200", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 500});
				};

				var promise = cgRates.getAccounts({Tenant:'test'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http response body has an error from CG Rates", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{error:"error"}});
				};

				var promise = cgRates.getAccounts({Tenant:'test'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should resolve with the request body result", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{result:[{id:1},{id:2}]}});
				};

				var promise = cgRates.getAccounts({Tenant:'test'});

				promise.then(function(result) {
					if (result[0].id === 1) {
						done();
					} else {
						done(new Error("Could not find correct id in body."));
					}
				}, function(err) {
					done(new Error("Promise rejected on valid request and response."));
				});
			});
		});

		describe("GetAccount", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.getAccount({});}, function(err) {return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require account", function() {
				assert.throws(() => {cgRates.getAccount({Tenant:'123'});}, function(err){return err.message === "Account is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should reject if the http request fails", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(new Error('test'));
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http status code is not 200", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 500});
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http response body has an error from CG Rates", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{error:"error"}});
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should resolve with the request body result", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{result:{id:1}}});
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					if (result.id === 1) {
						done();
					} else {
						done(new Error("Could not find correct id in body."));
					}
				}, function(err) {
					done(new Error("Promise rejected on valid request and response."));
				});
			});
		});

		describe("SetAccount", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.setAccount({});}, function(err){return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require account", function() {
				assert.throws(() => {cgRates.setAccount({Tenant:'123'});}, function(err){return err.message === "Account is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should reject if the http request fails", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(new Error('test'));
				};

				var promise = cgRates.setAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http status code is not 200", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 500});
				};

				var promise = cgRates.setAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http response body has an error from CG Rates", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{error:"error"}});
				};

				var promise = cgRates.setAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should resolve with the request body result", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{result:{id:1}}});
				};

				var promise = cgRates.setAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					if (result.id === 1) {
						done();
					} else {
						done(new Error("Could not find correct id in body."));
					}
				}, function(err) {
					done(new Error("Promise rejected on valid request and response."));
				});
			});
		});

		describe("RemoveAccount", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.getAccount({});}, function(err){return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require account", function() {
				assert.throws(() => {cgRates.getAccount({Tenant:'123'});}, function(err){return err.message === "Account is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should reject if the http request fails", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(new Error('test'));
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http status code is not 200", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 500});
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should reject if the http response body has an error from CG Rates", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{error:"error"}});
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					done(new Error("Promise resolved on failed http request."));
				}, function(err) {
					done();
				});
			});

			it("should resolve with the request body result", function(done) {
				cgRates.needle.post = function(url, data, options, callback) {
					callback(null, {statusCode: 200, body:{result:{id:1}}});
				};

				var promise = cgRates.getAccount({Tenant:'test', Account:'123'});

				promise.then(function(result) {
					if (result.id === 1) {
						done();
					} else {
						done(new Error("Could not find correct id in body."));
					}
				}, function(err) {
					done(new Error("Promise rejected on valid request and response."));
				});
			});
		});
	});
	describe("Balances", function() {
		describe("Create or Update Balance", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.createOrUpdateBalance({});}, function(err){return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require account", function() {
				assert.throws(() => {cgRates.createOrUpdateBalance({Tenant:'123'});}, function(err){return err.message === "Account is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require balance id or uuid", function() {
				assert.throws(() => {cgRates.createOrUpdateBalance({Tenant:'123', Account: '123'});}, function(err){return err.message === "BalanceId or BalanceUUID is required.";}, "Didn't throw exception when BalanceId and BalanceUUID is missing.");
			});
		});
		describe("Add Balance", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.addBalance({});}, function(err){return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require account", function() {
				assert.throws(() => {cgRates.addBalance({Tenant:'123'});}, function(err){return err.message === "Account is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require balance id or uuid", function() {
				assert.throws(() => {cgRates.addBalance({Tenant:'123', Account: '123'});}, function(err){return err.message === "BalanceId or BalanceUUID is required.";}, "Didn't throw exception when BalanceId and BalanceUUID is missing.");
			});
		});
		describe("Debit Balance", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.debitBalance({});}, function(err){return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require account", function() {
				assert.throws(() => {cgRates.debitBalance({Tenant:'123'});}, function(err){return err.message === "Account is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require balance id or uuid", function() {
				assert.throws(() => {cgRates.debitBalance({Tenant:'123', Account: '123'});}, function(err){return err.message === "BalanceId or BalanceUUID is required.";}, "Didn't throw exception when BalanceId and BalanceUUID is missing.");
			});
		});
		describe("Remove Balance", function() {
			it("should require tenant", function() {
				assert.throws(() => {cgRates.removeBalance({});}, function(err){return err.message === "Tenant is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require account", function() {
				assert.throws(() => {cgRates.removeBalance({Tenant:'123'});}, function(err){return err.message === "Account is required";}, "Didn't throw exception when tenant is missing.");
			});

			it("should require balance id or uuid", function() {
				assert.throws(() => {cgRates.removeBalance({Tenant:'123', Account: '123'});}, function(err){return err.message === "BalanceId or BalanceUUID is required.";}, "Didn't throw exception when BalanceId and BalanceUUID is missing.");
			});
		});
	});
});
