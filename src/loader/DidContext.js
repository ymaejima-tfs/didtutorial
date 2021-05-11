const value ={
  "@context": {
    "@protected": true,
    "id": "@id",
    "type": "@type",

    "alsoKnownAs": {
      "@id": "https://www.w3.org/ns/activitystreams#alsoKnownAs",
      "@type": "@id"
    },
    "assertionMethod": {
      "@id": "https://w3id.org/security#assertionMethod",
      "@type": "@id",
      "@container": "@set"
    },
    "authentication": {
      "@id": "https://w3id.org/security#authenticationMethod",
      "@type": "@id",
      "@container": "@set"
    },
    "capabilityDelegation": {
      "@id": "https://w3id.org/security#capabilityDelegationMethod",
      "@type": "@id",
      "@container": "@set"
    },
    "capabilityInvocation": {
      "@id": "https://w3id.org/security#capabilityInvocationMethod",
      "@type": "@id",
      "@container": "@set"
    },
    "controller": {
      "@id": "https://w3id.org/security#controller",
      "@type": "@id"
    },
    "keyAgreement": {
      "@id": "https://w3id.org/security#keyAgreementMethod",
      "@type": "@id",
      "@container": "@set"
    },
    "service": {
      "@id": "https://www.w3.org/ns/did#service",
      "@type": "@id",
      "@context": {
        "@protected": true,
        "id": "@id",
        "type": "@type",
        "serviceEndpoint": {
          "@id": "https://www.w3.org/ns/did#serviceEndpoint",
          "@type": "@id"
        }
      }
    },
    "verificationMethod": {
      "@id": "https://w3id.org/security#verificationMethod",
      "@type": "@id"
    }
  }
}

export default value;