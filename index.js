var needle = require('needle');
const uuidv4 = require('uuid/v4');

const balanceType  = {
	"SMS": "*sms",
	"VOICE": "*voice"
};

var CGRates = function(url, timeout) {
	var self = this;
	if (!url) {
		throw new Error("URL is required");
	}

	if (!timeout) {
		timeout = 60000;
	}

	this.url = url;
	this.timeout = timeout;
	this.needle = needle;

	this.getRequest = function(data) {
		var promise = new Promise(function(resolve, reject) {
			console.log (`neddle data: json:true, timeout:${self.timeout}` )
			self.needle.post(self.url, data, {json:true, timeout:self.timeout}, function(err, response) {
				if (err) {
					return reject(err);
				}

				if (response.statusCode != 200) {
					return reject(new Error(response.body));
				}

				if (response.body.error) {
					return reject(new Error(response.body.error));
				}

				resolve(response.body.result);
			});
		});

		return promise;
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV2.GetAccounts",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"AccountIds": "", //optional
	// 		"Offset": 0, //optional
	// 		"Limit": 0 //optional
	// 	}]
	// }
	this.getAccounts = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		var data = {
			method: "ApierV2.GetAccounts",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV2.GetAccount",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c"
	// 	}]
	// }
	this.getAccount = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		var data = {
			method: "ApierV2.GetAccount",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV1.GetMaxUsage",
	// 	"params": [{
	//     "ToR": "*sms",
	//     "RequestType":"sms",
	//     "Tenant": "cgrates.org",
	//     "Account": "test",
	//     "Category": "sms",
	//     "Subject": "",
	//     "Destination": "",
	//     "SetupTime": "1572116152",
	//     "Usage": "5"
	// 	}]
	// }
	this.getMaxUsage = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}
		if (!options.ToR) {
			options.Tor = balanceType.SMS;
		}
		if (!options.Category) {
			options.Category = "call";
		}

		if (!options.SetupTime) {
			options.SetupTime = Date.now().toString();
		}

		if (!options.Destination) {
			throw new Error("Destination is required");
		}

		if (!options.Usage) {
			throw new Error("Usage is required");
		}

		var data = {
			method: "ApierV1.GetMaxUsage",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV2.SetAccount",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c",
	// 		"ActionPlanId": "", //optional
	// 		"ActionTriggersId": "", //optional
	// 		"AllowNegative": true, //optional
	// 		"Disabled": false, //optional
	// 		"ReloadScheduler": true //optional
	// 	}]
	// }
	this.setAccount = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		var data = {
			method: "ApierV2.SetAccount",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	this.executAction = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		if (!options.ActionsId) {
			throw new Error("ActionsId is required");
		}

		var data = {
			method: "ApierV1.ExecuteAction",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV2.RemoveAccount",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c"
	// 	}]
	// }
	this.removeAccount = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		var data = {
			method: "ApierV2.RemoveAccount",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV1.SetBalance",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c",
	// 		"BalanceId": "5ccedcc8-38e2-4b02-b53b-013751b73450",
	// 		"BalanceUUID" : "5ccedcc8-38e2-4b02-b53b-013751b73450",
	// 		"BalanceType": "*sms", (*sms|*mms|*generic|*data|*voice)
	// 		"Disabled": "", //optional
	// 		"Weight": "", //optional
	// 		"Directions": "", //optional
	// 		"Value": "", //optional
	// 		"ExpiryTime": "", //optional
	// 		"RatingSubject": "", //optional
	// 		"Categories": "", //optional
	// 		"DestinationIds": "", //optional
	// 		"TimingsIds": "", //optional
	// 		"SharedGroups": "", //optional
	// 		"Overwrite": "", //optional
	// 		"Blocker": "" //optional
	// 	}]
	// }
	this.createOrUpdateBalance = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		if (!options.BalanceId && !options.BalanceUUID) {
			throw new Error("BalanceId or BalanceUUID is required.");
		}

		var data = {
			method: "ApierV1.SetBalance",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV1.AddBalance",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c",
	// 		"BalanceId": "5ccedcc8-38e2-4b02-b53b-013751b73450",
	// 		"BalanceType": "*sms",
	// 		"Value": 10
	// 	}]
	// }
	this.addBalance = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		if (!options.BalanceId && !options.BalanceUUID) {
			throw new Error("BalanceId or BalanceUUID is required.");
		}

		if (!options.Value) {
			throw new Error("Value is required");
		}

		var data = {
			method: "ApierV1.AddBalance",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV1.DebitBalance",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c",
	// 		"BalanceId": "5ccedcc8-38e2-4b02-b53b-013751b73450",
	// 		"BalanceType": "*sms",
	// 		"Value": 10
	// 	}]
	// }
	this.debitBalance = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		if (!options.BalanceId && !options.BalanceUUID) {
			throw new Error("BalanceId or BalanceUUID is required.");
		}

		if (!options.Value) {
			throw new Error("Value is required");
		}

		var data = {
			method: "ApierV1.DebitBalance",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV1.RemoveBalances",
	// 	"params": [{
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c",
	// 		"BalanceId": "5ccedcc8-38e2-4b02-b53b-013751b73450",
	// 		"BalanceType": "*sms"
	// 	}]
	// }
	this.removeBalance = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		if (!options.BalanceId && !options.BalanceUUID) {
			throw new Error("BalanceId or BalanceUUID is required.");
		}

		var data = {
			method: "ApierV1.RemoveBalances",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "CdrsV2.ProcessExternalCdr",
	// 	"params": [{
	// 		"TOR": "*sms",
	// 		"AccId": "9d92882f-0d55-47ab-ad97-c3f6f2fa532b",
	// 		"Direction": "out",
	// 		"RequestType": "pseudoprepaid",
	// 		"Destination": "5555551112",
	// 		"Usage": "1",
	// 		"PDD": "0",
	// 		"Tenant": "domain.com",
	// 		"Account": "5c1b474f-3a10-48d8-89a4-395a94a95a3c"
	// 	}]
	// }

	this.createCdr = function(options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Account) {
			throw new Error("Account is required");
		}

		if (!options.OriginID) {
			options.OriginID = uuidv4();
		}

		var data = {
			method: "CDRsV2.ProcessExternalCDR",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	// {
	// 	"id": 1,
	// 	"method": "ApierV2.GetCdrs",
	// 	"params": [{
	// 		"RunIDs": ["*default"],
	// 		"Tenant": "domain.com"
	// 	}]
	// }
	this.getCdrs = function(options, request_id) {};

	// {
	// 	"id": 1,
	// 	"method": "ApierV2.RemCdrs",
	// 	"params": [{
	// 		"CgrIds": ["95c7e5ccf93f207c64150b0b0b74bfb184c48cb9"]
	// 	}]
	// }
	this.deleteCdrs = function(options, request_id) {};

	this.setTPDestination = function (options, request_id) {
		if (!options.TPid) {
			throw new Error("TPid is required");
		}

		if (!options.ID) {
			throw new Error("ID is required");
		}

		if (!options.Prefixes) {
			throw new Error("Prefixes is required");
		}

		var data = {
			method: "ApierV2.SetTPDestination",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	this.setTPRate = function (options, request_id) {
		if (!options.TPid) {
			throw new Error("TPid is required");
		}

		if (!options.ID) {
			throw new Error("ID is required");
		}

		if (!options.RateSlots) {
			throw new Error("RateSlots is required");
		}

		var data = {
			method: "ApierV1.SetTPRate",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};


	this.loadFromStorDB = function (options, request_id) {
		if (!options.TPid) {
			throw new Error("TPid is required");
		}
		var data = {
			method: "ApierV1.LoadTariffPlanFromStorDb",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	this.setTPDestinationRate = function (options, request_id) {
		if (!options.TPid) {
			throw new Error("TPid is required");
		}

		if (!options.ID) {
			throw new Error("ID is required");
		}

		if (!options.DestinationRates) {
			throw new Error("ID is required");
		}

		var data = {
			method: "ApierV1.SetTPDestinationRate",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};


	this.setTPRatingPlan = function (options, request_id) {
		if (!options.TPid) {
			throw new Error("TPid is required");
		}

		if (!options.ID) {
			throw new Error("RatingPlanId is required");
		}


		if (!options.RatingPlanBindings) {
			throw new Error("RatingPlanId is required");
		}

		var data = {
			method: "ApierV1.SetTPRatingPlan",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};

	this.setTPRatingProfile = function (options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.Category) {
			throw new Error("Category is required");
		}


		if (!options.Direction) {
			throw new Error("Direction is required");
		}

		if (!options.Subject) {
			throw new Error("Subject is required");
		}

		var data = {
			method: "ApierV1.SetTPRatingProfile",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};


	this.GetSuppliers = function (options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.ID) {
			throw new Error("ID is required");
		}


		if (!options.Event) {
			throw new Error("Event is required");
		}

		var data = {
			method: "SupplierSv1.GetSuppliers",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};


	this.GetSupplierProfilesID = function (options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		var data = {
			method: "ApierV1.GetSupplierProfileIDs",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};


	this.GetSupplierProfile = function (options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.ID) {
			throw new Error("ID is required");
		}

		var data = {
			method: "ApierV1.GetSupplierProfile",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};


	this.SetSupplierProfile = function (options, request_id) {
		if (!options.Tenant) {
			throw new Error("Tenant is required");
		}

		if (!options.ID) {
			throw new Error("ID is required");
		}

		if (!options.ActivationInterval) {
			throw new Error("ActivationInterval is required");
		}

		if (!options.Sorting) {
			throw new Error("Sorting is required");
		}

		if (!options.Suppliers) {
			throw new Error("Suppliers are required");
		}


		var data = {
			method: "ApierV1.SetSupplierProfile",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};


	this.loadRatingPlan = function (options, request_id) {
		if (!options.TPid) {
			throw new Error("TPid is required");
		}

		if (!options.RatingPlanId) {
			throw new Error("RatingPlanId is required");
		}

		var data = {
			method: "ApierV1.LoadRatingPlan",
			params: [options]
		};

		if (request_id) {
			data.id = request_id;
		}

		return self.getRequest(data);
	};




	this.cacheClear = function () {

		var data = {
			method: "CacheSv1.ReloadCache",
			params: [{
				"FlushAll": true
			}]
		};

		return self.getRequest(data);
	};


	return this;
};

module.exports = CGRates;

// var cgRates = new CGRates("http://172.20.4.13:2080/jsonrpc");

// var data = {Tenant: "domain.com", Account: "f1ed1023-b6a0-4140-ad4c-5475006f86d3"};

// cgRates.getAccount(data).then(function(result) {
// 	console.log(result);
// }, function(err) {
// 	console.log("ERROR");
// 	console.log(err);
// });