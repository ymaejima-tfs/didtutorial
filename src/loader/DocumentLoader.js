// This module shold be rewrited using this library.
// https://github.com/decentralized-identity/jsonld-document-loader
import { extendContextLoader } from 'jsonld-signatures';
import ed25519Context from './Ed25519Context';
import exampleContext from './ExampleContext';
import didContext from './DidContext';
import x25519Context from './X25519Context';


import vc from '@digitalbazaar/vc';
import { driver } from '@digitalbazaar/did-method-key';

const defaultDocumentLoader = vc.defaultDocumentLoader;
const didKeyDriver = driver();

const DocumentLoader = extendContextLoader(async url => {
  console.log(url);
  if (url.startsWith("did:key:")) {
    try {
      const didDocument = await didKeyDriver.get({ url });
      return {
        contextUrl: null,
        documentUrl: url,
        document: didDocument
      };
    } catch (e) {
      console.log(e);
    }
  }
  if (url === 'https://w3id.org/security/suites/ed25519-2020/v1') {
    return {
      contextUrl: null,
      documentUrl: url,
      document: ed25519Context
    };
  }
  if (url === 'https://w3id.org/security/suites/x25519-2020/v1') {
    return {
      contextUrl: null,
      documentUrl: url,
      document: x25519Context
    };
  }
  if (url === 'https://www.w3.org/2018/credentials/examples/v1') {
    return {
      contextUrl: null,
      documentUrl: url,
      document: exampleContext
    };
  }
  if (url === 'https://www.w3.org/ns/did/v1') {
    return {
      contextUrl: null,
      documentUrl: url,
      document: didContext
    };
  }

  return defaultDocumentLoader(url);
});

export default DocumentLoader;