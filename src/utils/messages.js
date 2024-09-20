const messages = {
    accessDenied: {
        code: "TIP-001",
        message: "Access Denied - Invalid ApiKey"
    },
    creatingToken: {
        code: "TIP-002",
        message: "Error creating token"
    },
    savingToken: {
        code: "TIP-003",
        message: "Error saving token"
    },
    gettingCompany: {
        code: "TIP-004",
        message: "Error getting company"
    },
    invalidToken: {
        code: "TIP-005",
        message: "Invalid Token"
    },
    tokenNotValid: {
        code: "TIP-006",
        message: "Token is not valid"
    },
    tokenNotProvided: {
        code: "TIP-007",
        message: "Token not provided"
    },
    tokenInactive: {
        code: "TIP-008",
        message: "Token is not active"
    }
}
module.exports = messages;