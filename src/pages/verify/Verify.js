import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020';
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020';
import vc from '@digitalbazaar/vc';
import { driver } from '@digitalbazaar/did-method-key';

import React from 'react';
import Button from '@material-ui/core/Button';
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-cobalt";

import { WalletContext } from "../../contexts/Wallet";
import documentLoader from "../../loader/DocumentLoader";

const didKeyDriver = driver();

function VerifyPane() {
  const wallet = React.useContext(WalletContext);
  const [verifiablePresentation, setVerifiablePresentation] = React.useState("");
  const [verificationResult, setVerificationResult] = React.useState("");

  const verifyVerifiablePresentation = async function () {
    try {
      // TODO: create suite from issuer publickey
      const keyPair = await Ed25519VerificationKey2020.from(wallet.currentKey);
      const suite = new Ed25519Signature2020({ key: keyPair });
      const challenge = "hogehoge"

      const parsedVP = JSON.parse(verifiablePresentation)
      // TODO: implement verification method without suite
      const result = await vc.verify({
        presentation: parsedVP,
        documentLoader: documentLoader,
        challenge: challenge,
        suite: suite});
      console.log(result);
      const resultString = JSON.stringify(result, null, 2);
      setVerificationResult(resultString);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h1>Verify credential</h1>
      <h2>Paste verifiable presentation here</h2>
      <AceEditor
        mode={'json'}
        theme="cobalt"
        style={{ width: '100%' }}
        readOnly={false}
        wrapEnabled={true}
        minLines={20}
        maxLines={50}
        name="Credential to be issued"
        value={verifiablePresentation}
        onChange={setVerifiablePresentation} />

      <h2>Verify</h2>
      <p>
        <Button variant="contained" color="primary" onClick={verifyVerifiablePresentation}>
          Verify the verifiable presentation
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
        value={verificationResult}
      />
    </div>
  );
}

export default VerifyPane;
