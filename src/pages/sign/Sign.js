import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020';
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020';
import vc from '@digitalbazaar/vc';

import React from 'react';
import Button from '@material-ui/core/Button';

import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-cobalt";

import { WalletContext } from "../../contexts/Wallet";

import simple from "./SimpleCredentials";
import documentLoader from "../../loader/DocumentLoader";

const credentialTemplates = {
  simple: JSON.stringify(simple, null, 2)
}

function SignPane() {
  const wallet = React.useContext(WalletContext);

  const [credential, setCredential] = React.useState(credentialTemplates.simple);
  const [verifiableCredential, setVerifiableCredential] = React.useState("");
  const [verifiablePresentation, setVerifiablePresentation] = React.useState("");

  const signToCredetial = async function () {
    try {
      const keyPair = await Ed25519VerificationKey2020.from(wallet.currentKey);
      const suite = new Ed25519Signature2020({ key: keyPair });

      const parsedCredential = JSON.parse(credential);
      const signedVC = await vc.issue({
        credential: parsedCredential,
        suite: suite,
        documentLoader: documentLoader
      });
      const signedVCString = JSON.stringify(signedVC, null, 2);
      setVerifiableCredential(signedVCString);
    } catch (e) {
      console.log(e);
    }
  }

  const createVerifiablePresentation = async function () {
    try {
      const id = 'ebc6f1c2';
      const holder = 'did:ex:12345';

      const parsedVC = JSON.parse(verifiableCredential);
      const presentation = vc.createPresentation({
        verifiableCredential: parsedVC,
        id: id,
        holder: holder
      });

      const keyPair = await Ed25519VerificationKey2020.from(wallet.currentKey);
      const suite = new Ed25519Signature2020({ key: keyPair });
      const challenge = "hogehoge";

      const vp = await vc.signPresentation({
        presentation: presentation,
        suite: suite,
        challenge: challenge,
        documentLoader: documentLoader
      });

      const presentationString = JSON.stringify(vp, null, 2);
      setVerifiablePresentation(presentationString);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h1>Sign to issued credential</h1>
      <h2>Credentials</h2>
      <AceEditor
        mode={'json'}
        theme="cobalt"
        style={{ width: '100%' }}
        readOnly={false}
        wrapEnabled={true}
        minLines={20}
        maxLines={50}
        name="Credential to be issued"
        value={credential}
        onChange={setCredential} />

      <h2>Verifiable Credential</h2>
      <p>
        <Button variant="contained" color="primary" onClick={signToCredetial}>
          Sign to the credential
        </Button>
      </p>
      <AceEditor
        mode={'json'}
        theme="cobalt"
        style={{ width: '100%' }}
        readOnly={true}
        wrapEnabled={true}
        minLines={20}
        maxLines={50}
        name="Credential to be issued"
        value={verifiableCredential}
      />
      <h2>Verifiable Presentation</h2>
      <p>
        <Button variant="contained" color="primary" onClick={createVerifiablePresentation}>
          Create verifiable presentation
        </Button>
      </p>
      <AceEditor
        mode={'json'}
        theme="cobalt"
        style={{ width: '100%' }}
        readOnly={true}
        wrapEnabled={true}
        minLines={20}
        maxLines={50}
        name="Credential to be issued"
        value={verifiablePresentation}
      />
      <p>This is not <i>unsigned</i> presentation.</p>

    </div>
  );
}

export default SignPane;
