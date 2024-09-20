'use strict'

const axios = require("axios")

class ESignService {
  /**
   * Constructor
   * @param {String} apikey API Key
   */
  constructor (apikey, serviceURL) {
    this.apikey = apikey
    this.serviceURL = serviceURL
  }

  /**
   * Retrive a Token Record
   * @param {String} uuid Primary Key
   * @returns {Promise}
   */
  addSingleSignatory (data) {
    var headers = {
        "Content-Type": "application/json",
        "apiKey": this.apikey
		}
		return axios.post(this.serviceURL + "/api/ESign/addSingleSignatory",
			data, {
				headers: headers 
			}
		)
  }

  /**
   * Retrive a signed document
   * 
   * @param {string} apiKey apikey
   * @param {string} id 
   * 
   * @returns {Promise}
   */
  downloadDocument (id) {
    var headers = {
      "Content-Type": "application/json",
      "apiKey": this.apikey
    }
    let data = {
      identifier: id
    }
    return axios.post(this.serviceURL + "/api/ESign/getDocument",
      data, {
        headers: headers 
      }
    )
  }
}

module.exports = ESignService
